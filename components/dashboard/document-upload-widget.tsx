"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, File, X, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface UploadedFile {
  id: string
  name: string
  size: number
  status: "uploading" | "completed" | "error"
  progress: number
}

interface DocumentUploadWidgetProps {
  onFilesSelected: (files: FileList) => void
}

export function DocumentUploadWidget({ onFilesSelected }: DocumentUploadWidgetProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        status: "uploading",
        progress: 0,
      }))

      setUploadedFiles((prev) => [...prev, ...newFiles])

      // Simulate upload progress
      newFiles.forEach((file) => {
        const interval = setInterval(() => {
          setUploadedFiles((prev) =>
            prev.map((f) => {
              if (f.id === file.id) {
                const newProgress = f.progress + Math.random() * 30
                if (newProgress >= 100) {
                  clearInterval(interval)
                  return { ...f, progress: 100, status: "completed" }
                }
                return { ...f, progress: newProgress }
              }
              return f
            }),
          )
        }, 200)
      })

      // Convert to FileList for callback
      const fileList = acceptedFiles as unknown as FileList
      onFilesSelected(fileList)
    },
    [onFilesSelected],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "text/plain": [".txt"],
    },
    multiple: true,
  })

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <Card className="card-gradient hover-lift scroll-animate">
      <CardHeader>
        <CardTitle className="text-xl font-montserrat text-white">Upload Documents</CardTitle>
        <CardDescription className="text-white/70">
          Upload lease agreements, financial statements, and property documents for AI analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 hover-glow ${
            isDragActive ? "border-blue-400 bg-blue-500/10" : "border-white/30 hover:border-white/50 hover:bg-white/5"
          }`}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Upload className="h-8 w-8 text-white" />
            </div>
            {isDragActive ? (
              <div>
                <p className="text-lg font-medium text-white">Drop the files here...</p>
                <p className="text-white/60">Release to upload your documents</p>
              </div>
            ) : (
              <div>
                <p className="text-lg font-medium text-white">Drag & drop files here</p>
                <p className="text-white/60">or click to browse your computer</p>
                <p className="text-sm text-white/50 mt-2">Supports PDF, DOC, DOCX, TXT files up to 10MB each</p>
              </div>
            )}
          </div>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="mt-6 space-y-3">
            <h4 className="font-medium text-white">Uploaded Files</h4>
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center space-x-3 p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="flex-shrink-0">
                  {file.status === "completed" ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : file.status === "error" ? (
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  ) : (
                    <File className="h-5 w-5 text-blue-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{file.name}</p>
                  <p className="text-xs text-white/60">{formatFileSize(file.size)}</p>
                  {file.status === "uploading" && <Progress value={file.progress} className="mt-1 h-1" />}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(file.id)}
                  className="text-white/60 hover:text-white hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
