import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { AlertCard } from './AlertCard';
import { DisasterMap } from './DisasterMap';
import { ReportIncidentModal } from './ReportIncidentModal';
import { SafetyTips } from './SafetyTips';
import { EmergencyContacts } from './EmergencyContacts';
import { 
  Search, 
  Bell, 
  User, 
  Plus, 
  Menu,
  LogOut
} from 'lucide-react';

interface CitizenDashboardProps {
  onLogout: () => void;
}

const mockAlerts = [
  {
    id: 1,
    type: 'Flood',
    severity: 'high',
    location: 'Downtown Area, Sector 5',
    timestamp: '10 mins ago',
    description: 'Heavy rainfall causing flooding in low-lying areas. Water level rising rapidly.',
    lat: 40.7128,
    lng: -74.0060
  },
  {
    id: 2,
    type: 'Fire',
    severity: 'critical',
    location: 'Industrial Zone, Block B',
    timestamp: '25 mins ago',
    description: 'Large fire detected in warehouse district. Evacuate immediately.',
    lat: 40.7580,
    lng: -73.9855
  },
  {
    id: 3,
    type: 'Earthquake',
    severity: 'moderate',
    location: 'City Center',
    timestamp: '1 hour ago',
    description: 'Magnitude 4.2 earthquake detected. Check for structural damage.',
    lat: 40.7489,
    lng: -73.9680
  },
  {
    id: 4,
    type: 'Cyclone',
    severity: 'high',
    location: 'Coastal Region',
    timestamp: '2 hours ago',
    description: 'Cyclone approaching coastal areas. Strong winds expected.',
    lat: 40.7306,
    lng: -74.0060
  }
];

export function CitizenDashboard({ onLogout }: CitizenDashboardProps) {
  const [showReportModal, setShowReportModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <h1 className="text-slate-900"> Alert Sphere Citizen</h1>
            </div>

            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  placeholder="Search alerts, locations..." 
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                  3
                </span>
              </Button>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search alerts, locations..." 
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-slate-600 mb-1">Active Alerts</div>
            <div className="text-slate-900">12</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-slate-600 mb-1">Nearby Shelters</div>
            <div className="text-slate-900">8</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-slate-600 mb-1">Safe Zones</div>
            <div className="text-slate-900">15</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-slate-600 mb-1">Your Reports</div>
            <div className="text-slate-900">2</div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Map */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <h2 className="text-slate-900">Live Disaster Map</h2>
                <Button 
                  onClick={() => setShowReportModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Report Incident
                </Button>
              </div>
              <DisasterMap markers={mockAlerts} height="500px" />
            </div>

            {/* Emergency Contacts - Mobile */}
            <div className="lg:hidden">
              <EmergencyContacts />
            </div>

            {/* Safety Tips - Mobile */}
            <div className="lg:hidden">
              <SafetyTips />
            </div>
          </div>

          {/* Right Column - Alerts Feed */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-4 border-b border-slate-200">
                <h2 className="text-slate-900">Live Alert Feed</h2>
              </div>
              <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto">
                {mockAlerts.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>

            {/* Emergency Contacts - Desktop */}
            <div className="hidden lg:block">
              <EmergencyContacts />
            </div>

            {/* Safety Tips - Desktop */}
            <div className="hidden lg:block">
              <SafetyTips />
            </div>
          </div>
        </div>
      </main>

      {/* Report Incident Modal */}
      <ReportIncidentModal 
        open={showReportModal}
        onClose={() => setShowReportModal(false)}
      />
    </div>
  );
}
