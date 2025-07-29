"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, RefreshCw, FileText, AlertTriangle, CheckCircle, Clock, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface DocumentItem {
  id: string
  name: string
  type: "lease" | "financial" | "legal" | "inspection"
  status: "pending" | "processing" | "complete" | "error"
  metrics: {
    NOI?: number
    DSCR?: number
    capRate?: number
  }
  uploadDate: string
  redFlags: number
}

interface DocumentListTableProps {
  documents: DocumentItem[]
  onAction: (docId: string, action: "view" | "reprocess") => void
}

export function DocumentListTable({ documents, onAction }: DocumentListTableProps) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)

  const mockDocuments: DocumentItem[] = [
    {
      id: "1",
      name: "Oak Street Plaza - Lease Agreement.pdf",
      type: "lease",
      status: "complete",
      metrics: { NOI: 2400000, DSCR: 1.42, capRate: 7.5 },
      uploadDate: "2024-01-15",
      redFlags: 0,
    },
    {
      id: "2",
      name: "Maple Commons - Financial Statements.xlsx",
      type: "financial",
      status: "complete",
      metrics: { NOI: 1800000, DSCR: 1.28, capRate: 6.8 },
      uploadDate: "2024-01-14",
      redFlags: 2,
    },
    {
      id: "3",
      name: "Pine Ridge Center - Inspection Report.pdf",
      type: "inspection",
      status: "processing",
      metrics: {},
      uploadDate: "2024-01-13",
      redFlags: 1,
    },
    {
      id: "4",
      name: "Downtown Tower - Legal Documents.pdf",
      type: "legal",
      status: "error",
      metrics: {},
      uploadDate: "2024-01-12",
      redFlags: 0,
    },
  ]

  const displayDocuments = documents.length > 0 ? documents : mockDocuments

  const getStatusIcon = (status: DocumentItem["status"]) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-500 animate-pulse" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: DocumentItem["status"]) => {
    const variants = {
      complete: "bg-emerald-100 text-emerald-800",
      processing: "bg-yellow-100 text-yellow-800",
      error: "bg-red-100 text-red-800",
      pending: "bg-gray-100 text-gray-800",
    }

    return (
      <Badge variant="outline" className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getTypeIcon = (type: DocumentItem["type"]) => {
    return <FileText className="h-4 w-4 text-gray-400" />
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  if (displayDocuments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-montserrat">Documents</CardTitle>
          <CardDescription>Uploaded documents and their analysis status</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents uploaded</h3>
            <p className="text-gray-500 mb-4">Upload your first document to start analyzing deals</p>
            <Button className="btn-primary">Upload Documents</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-montserrat">Documents</CardTitle>
          <CardDescription>
            {displayDocuments.length} document{displayDocuments.length !== 1 ? "s" : ""} uploaded and analyzed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>NOI</TableHead>
                  <TableHead>DSCR</TableHead>
                  <TableHead>Cap Rate</TableHead>
                  <TableHead>Red Flags</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayDocuments.map((doc, index) => (
                  <motion.tr
                    key={doc.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group hover:bg-gray-50 transition-colors"
                    onMouseEnter={() => setHoveredRow(doc.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        {getTypeIcon(doc.type)}
                        <div>
                          <div className="font-medium text-gray-900">{doc.name}</div>
                          <div className="text-sm text-gray-500">
                            Uploaded {new Date(doc.uploadDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="capitalize text-sm text-gray-600">{doc.type}</span>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(doc.status)}
                        {getStatusBadge(doc.status)}
                      </div>
                    </TableCell>

                    <TableCell>
                      {doc.metrics.NOI ? (
                        <span className="font-medium">{formatCurrency(doc.metrics.NOI)}</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </TableCell>

                    <TableCell>
                      {doc.metrics.DSCR ? (
                        <span className="font-medium">{doc.metrics.DSCR.toFixed(2)}</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </TableCell>

                    <TableCell>
                      {doc.metrics.capRate ? (
                        <span className="font-medium">{doc.metrics.capRate}%</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </TableCell>

                    <TableCell>
                      {doc.redFlags > 0 ? (
                        <Badge variant="outline" className="bg-red-100 text-red-800">
                          {doc.redFlags}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-emerald-100 text-emerald-800">
                          0
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                              hoveredRow === doc.id ? "opacity-100" : ""
                            }`}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onAction(doc.id, "view")}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onAction(doc.id, "reprocess")}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Reprocess
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
