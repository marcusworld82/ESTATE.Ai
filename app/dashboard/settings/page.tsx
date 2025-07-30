"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Bell, Brain, Link, Shield, Save, Eye, EyeOff, Database, Key, Smartphone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [showPassword, setShowPassword] = useState(false)
  const [voiceSpeed, setVoiceSpeed] = useState([75])
  const [aiConfidence, setAiConfidence] = useState([85])

  const integrations = [
    { name: "Dropbox", status: "connected", icon: "📁", description: "Document storage and sync" },
    { name: "Google Drive", status: "connected", icon: "📂", description: "Cloud file management" },
    { name: "Slack", status: "connected", icon: "💬", description: "Team communication" },
    { name: "Zapier", status: "disconnected", icon: "⚡", description: "Workflow automation" },
    { name: "MLS", status: "connected", icon: "🏠", description: "Property listings" },
    { name: "DocuSign", status: "disconnected", icon: "✍️", description: "Digital signatures" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center slide-in-up">
          <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
          <p className="text-white/80">Manage your Estate.AI preferences and configurations</p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 backdrop-blur-xl border border-slate-600/30 p-2 mb-8">
            <TabsTrigger
              value="profile"
              className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium transition-all hover-lift btn-animated"
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium transition-all hover-lift btn-animated"
            >
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="ai"
              className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium transition-all hover-lift btn-animated"
            >
              <Brain className="mr-2 h-4 w-4" />
              AI Settings
            </TabsTrigger>
            <TabsTrigger
              value="integrations"
              className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium transition-all hover-lift btn-animated"
            >
              <Link className="mr-2 h-4 w-4" />
              Integrations
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium transition-all hover-lift btn-animated"
            >
              <Shield className="mr-2 h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="card-dark hover-glow text-white">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Profile Information</CardTitle>
                  <CardDescription className="text-white/70">
                    Update your personal information and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName" className="text-white font-medium">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        defaultValue="Sarah"
                        className="mt-2 bg-slate-800/50 border-slate-600/30 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20 input-focus"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-white font-medium">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        defaultValue="Johnson"
                        className="mt-2 bg-slate-800/50 border-slate-600/30 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20 input-focus"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="sarah@johnsonrealestate.com"
                      className="mt-2 bg-slate-800/50 border-slate-600/30 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20 input-focus"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-white font-medium">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      defaultValue="+1 (555) 123-4567"
                      className="mt-2 bg-slate-800/50 border-slate-600/30 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20 input-focus"
                    />
                  </div>

                  <div>
                    <Label htmlFor="company" className="text-white font-medium">
                      Company
                    </Label>
                    <Input
                      id="company"
                      defaultValue="Johnson Real Estate"
                      className="mt-2 bg-slate-800/50 border-slate-600/30 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20 input-focus"
                    />
                  </div>

                  <div>
                    <Label htmlFor="timezone" className="text-white font-medium">
                      Timezone
                    </Label>
                    <Select defaultValue="est">
                      <SelectTrigger className="mt-2 bg-slate-800/50 border-slate-600/30 text-white focus:border-blue-400 input-focus">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900/90 backdrop-blur-xl border-slate-600/30">
                        <SelectItem value="pst" className="text-white focus:bg-slate-700/50">
                          Pacific Standard Time
                        </SelectItem>
                        <SelectItem value="mst" className="text-white focus:bg-slate-700/50">
                          Mountain Standard Time
                        </SelectItem>
                        <SelectItem value="cst" className="text-white focus:bg-slate-700/50">
                          Central Standard Time
                        </SelectItem>
                        <SelectItem value="est" className="text-white focus:bg-slate-700/50">
                          Eastern Standard Time
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="btn-primary btn-ripple hover-lift">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-black/20 backdrop-blur-xl border border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Notification Preferences</CardTitle>
                  <CardDescription className="text-white/70">
                    Choose how you want to be notified about important events
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-6">
                    <h4 className="font-semibold text-white text-lg">Email Notifications</h4>

                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg border border-white/20">
                      <div>
                        <Label className="text-white font-medium">Deal Updates</Label>
                        <p className="text-sm text-white/60 mt-1">Get notified when deals change status</p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-green-500" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg border border-white/20">
                      <div>
                        <Label className="text-white font-medium">AI Analysis Complete</Label>
                        <p className="text-sm text-white/60 mt-1">Receive alerts when document analysis finishes</p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-green-500" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg border border-white/20">
                      <div>
                        <Label className="text-white font-medium">Red Flag Alerts</Label>
                        <p className="text-sm text-white/60 mt-1">Immediate alerts for critical issues</p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-green-500" />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="font-semibold text-white text-lg">Push Notifications</h4>

                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg border border-white/20">
                      <div>
                        <Label className="text-white font-medium">Voice AI Calls</Label>
                        <p className="text-sm text-white/60 mt-1">Notifications for completed AI calls</p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-green-500" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg border border-white/20">
                      <div>
                        <Label className="text-white font-medium">New Leads</Label>
                        <p className="text-sm text-white/60 mt-1">Alert when new leads are captured</p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="ai" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="bg-black/20 backdrop-blur-xl border border-white/20 text-white">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Voice AI Configuration</CardTitle>
                    <CardDescription className="text-white/70">Customize your AI voice agent settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="text-white font-medium">Voice Model</Label>
                      <Select defaultValue="professional-female">
                        <SelectTrigger className="mt-2 bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20">
                          <SelectItem value="professional-female" className="text-white">
                            Professional Female
                          </SelectItem>
                          <SelectItem value="professional-male" className="text-white">
                            Professional Male
                          </SelectItem>
                          <SelectItem value="friendly-female" className="text-white">
                            Friendly Female
                          </SelectItem>
                          <SelectItem value="friendly-male" className="text-white">
                            Friendly Male
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-white font-medium">Speaking Speed</Label>
                      <div className="mt-4">
                        <Slider
                          value={voiceSpeed}
                          onValueChange={setVoiceSpeed}
                          max={100}
                          min={50}
                          step={5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-white/60 mt-2">
                          <span>Slow</span>
                          <span>Normal</span>
                          <span>Fast</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg border border-white/20">
                      <div>
                        <Label className="text-white font-medium">Voice Interruption</Label>
                        <p className="text-sm text-white/60 mt-1">Allow callers to interrupt AI responses</p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-green-500" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="bg-black/20 backdrop-blur-xl border border-white/20 text-white">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">AI Analysis Settings</CardTitle>
                    <CardDescription className="text-white/70">
                      Configure document analysis and risk detection
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="text-white font-medium">Confidence Threshold</Label>
                      <div className="mt-4">
                        <Slider
                          value={aiConfidence}
                          onValueChange={setAiConfidence}
                          max={100}
                          min={60}
                          step={5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-white/60 mt-2">
                          <span>60%</span>
                          <span className="text-green-400 font-medium">{aiConfidence[0]}%</span>
                          <span>100%</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-white font-medium">Risk Detection Level</Label>
                      <Select defaultValue="high">
                        <SelectTrigger className="mt-2 bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20">
                          <SelectItem value="conservative" className="text-white">
                            Conservative
                          </SelectItem>
                          <SelectItem value="moderate" className="text-white">
                            Moderate
                          </SelectItem>
                          <SelectItem value="high" className="text-white">
                            High Sensitivity
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg border border-white/20">
                      <div>
                        <Label className="text-white font-medium">Auto-process Documents</Label>
                        <p className="text-sm text-white/60 mt-1">Automatically analyze uploaded documents</p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-green-500" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-black/20 backdrop-blur-xl border border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Connected Services</CardTitle>
                  <CardDescription className="text-white/70">
                    Manage your third-party integrations and connections
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {integrations.map((integration, index) => (
                      <motion.div
                        key={integration.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-6 bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition-all"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl">{integration.icon}</div>
                          <div>
                            <h4 className="font-semibold text-white">{integration.name}</h4>
                            <p className="text-sm text-white/60">{integration.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Badge
                            variant="outline"
                            className={
                              integration.status === "connected"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                            }
                          >
                            {integration.status}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-transparent border-white/20 text-white hover:bg-white/10 transition-all"
                          >
                            {integration.status === "connected" ? "Configure" : "Connect"}
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="bg-black/20 backdrop-blur-xl border border-white/20 text-white">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Password & Authentication</CardTitle>
                    <CardDescription className="text-white/70">Manage your account security settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="currentPassword" className="text-white font-medium">
                        Current Password
                      </Label>
                      <div className="relative mt-2">
                        <Input
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          className="bg-white/10 border-white/20 text-white pr-10 focus:border-green-400"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 text-white hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="newPassword" className="text-white font-medium">
                        New Password
                      </Label>
                      <Input
                        id="newPassword"
                        type="password"
                        className="mt-2 bg-white/10 border-white/20 text-white focus:border-green-400"
                      />
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword" className="text-white font-medium">
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        className="mt-2 bg-white/10 border-white/20 text-white focus:border-green-400"
                      />
                    </div>

                    <Button className="bg-green-500 hover:bg-green-600 text-black font-semibold transition-all hover:scale-105">
                      <Key className="mr-2 h-4 w-4" />
                      Update Password
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="bg-black/20 backdrop-blur-xl border border-white/20 text-white">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Two-Factor Authentication</CardTitle>
                    <CardDescription className="text-white/70">
                      Add an extra layer of security to your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg border border-white/20">
                      <div>
                        <Label className="text-white font-medium">SMS Authentication</Label>
                        <p className="text-sm text-white/60 mt-1">Receive codes via text message</p>
                      </div>
                      <Switch className="data-[state=checked]:bg-green-500" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg border border-white/20">
                      <div>
                        <Label className="text-white font-medium">Authenticator App</Label>
                        <p className="text-sm text-white/60 mt-1">Use Google Authenticator or similar</p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-green-500" />
                    </div>

                    <div className="p-4 bg-white/10 rounded-lg border border-white/20">
                      <div className="flex items-center space-x-3 mb-3">
                        <Smartphone className="h-5 w-5 text-green-500" />
                        <div>
                          <h4 className="font-semibold text-white">Backup Codes</h4>
                          <p className="text-sm text-white/60">Generate backup codes for account recovery</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent border-white/20 text-white hover:bg-white/10 transition-all"
                      >
                        Generate Codes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="bg-black/20 backdrop-blur-xl border border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Data & Privacy</CardTitle>
                  <CardDescription className="text-white/70">Control how your data is used and stored</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg border border-white/20">
                    <div>
                      <Label className="text-white font-medium">Data Analytics</Label>
                      <p className="text-sm text-white/60 mt-1">Allow usage analytics to improve the platform</p>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-green-500" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg border border-white/20">
                    <div>
                      <Label className="text-white font-medium">Marketing Communications</Label>
                      <p className="text-sm text-white/60 mt-1">Receive product updates and marketing emails</p>
                    </div>
                    <Switch className="data-[state=checked]:bg-green-500" />
                  </div>

                  <div className="pt-4 border-t border-white/20">
                    <Button
                      variant="outline"
                      className="bg-transparent border-red-500/50 text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      <Database className="mr-2 h-4 w-4" />
                      Export All Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
