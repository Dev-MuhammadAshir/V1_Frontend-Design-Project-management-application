import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Shield, Sliders, Clock, Mail, Phone, MapPin, Save, Plus, X } from 'lucide-react';
import { RoleBadge } from '../components/common/Badge';

export const Profile: React.FC = () => {
  const { currentUser, updateUser } = useApp();
  const [activeSection, setActiveSection] = useState<'profile' | 'security' | 'preferences'>('profile');

  // Local state for profile editing
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone || '+1 (555) 234-8901');
  const [department, setDepartment] = useState(currentUser.department);
  const [capacityHours, setCapacityHours] = useState(currentUser.capacityHours);
  const [workSchedule, setWorkSchedule] = useState(currentUser.workSchedule || 'Mon-Fri 09:00 - 17:00 EST');
  const [timeZone, setTimeZone] = useState(currentUser.timeZone || 'America/New_York');
  const [skills, setSkills] = useState<string[]>(currentUser.skills || []);
  const [newSkill, setNewSkill] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(currentUser.id, {
      name,
      email,
      phone,
      department,
      capacityHours: Number(capacityHours),
      workSchedule,
      timeZone,
      skills
    });
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim() || skills.includes(newSkill.trim())) return;
    setSkills([...skills, newSkill.trim()]);
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-slate-200"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">{currentUser.name}</h1>
              <RoleBadge role={currentUser.role} />
            </div>
            <p className="text-xs text-slate-500 font-mono">{currentUser.email} · {currentUser.department}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
          <Clock className="w-4 h-4 text-blue-600" />
          <div className="text-xs">
            <span className="text-[10px] text-blue-600 uppercase font-semibold block">Weekly Capacity</span>
            <span className="font-mono font-bold text-blue-900">{currentUser.capacityHours} Hours / Week</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Layout (S-03) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Nav (S-03) */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <button
            onClick={() => setActiveSection('profile')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors text-left cursor-pointer ${
              activeSection === 'profile'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Capacity</span>
          </button>

          <button
            onClick={() => setActiveSection('security')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors text-left cursor-pointer ${
              activeSection === 'security'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Security & Auth</span>
          </button>

          <button
            onClick={() => setActiveSection('preferences')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors text-left cursor-pointer ${
              activeSection === 'preferences'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Work Preferences</span>
          </button>
        </div>

        {/* Right Content */}
        <div className="md:col-span-3 bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
          {activeSection === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-6 text-xs">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Personal & Workload Settings</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update your contact details and weekly sprint capacity limits (SRS S-03).
                </p>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Capacity Hours (10-80h Slider & Input - Core SRS S-03 requirement) */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-bold text-slate-900 block text-xs">
                      Weekly Capacity Hours (SRS S-03)
                    </label>
                    <span className="text-[11px] text-slate-500">
                      Permitted range: 10 to 80 hours/week. Used by PIRAE engine to calculate overload.
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-base font-bold text-blue-700 bg-white border border-blue-200 px-3 py-1 rounded-lg">
                    <span>{capacityHours}</span>
                    <span className="text-xs text-slate-500 font-sans">hrs</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-[11px] font-mono text-slate-400">10h</span>
                  <input
                    type="range"
                    min={10}
                    max={80}
                    step={1}
                    value={capacityHours}
                    onChange={e => setCapacityHours(Number(e.target.value))}
                    className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <span className="text-[11px] font-mono text-slate-400">80h</span>
                </div>
              </div>

              {/* Department & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-2.5 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-2.5 focus:outline-none"
                  />
                </div>
              </div>

              {/* Schedule & Timezone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Work Schedule</label>
                  <input
                    type="text"
                    value={workSchedule}
                    onChange={e => setWorkSchedule(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-2.5 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Timezone</label>
                  <select
                    value={timeZone}
                    onChange={e => setTimeZone(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-2.5 bg-white focus:outline-none"
                  >
                    <option value="America/New_York">America/New_York (EST)</option>
                    <option value="America/Chicago">America/Chicago (CST)</option>
                    <option value="America/Los_Angeles">America/Los_Angeles (PST)</option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                    <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                  </select>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="space-y-2">
                <label className="block font-semibold text-slate-700">Engineering & Design Skills</label>
                <div className="flex flex-wrap items-center gap-1.5">
                  {skills.map(skill => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-slate-400 hover:text-slate-700 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 max-w-sm mt-2">
                  <input
                    type="text"
                    placeholder="Add skill (e.g. GraphQL)..."
                    value={newSkill}
                    onChange={e => setNewSkill(e.target.value)}
                    className="flex-1 border border-slate-200 rounded-md px-3 py-1.5 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-3 py-1.5 bg-slate-900 text-white rounded-md font-medium hover:bg-slate-800 cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile</span>
                </button>
              </div>
            </form>
          )}

          {activeSection === 'security' && (
            <div className="space-y-4 text-xs">
              <h3 className="text-sm font-bold text-slate-900">Security Credentials & MFA</h3>
              <p className="text-slate-500">
                Multi-factor authentication is enforced by company-wide Zero-Trust SOC2 policy.
              </p>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-slate-800">Two-Factor Authentication (TOTP)</p>
                    <p className="text-[11px] text-slate-500">Hardware token or Authenticator app</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">
                    ENABLED
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'preferences' && (
            <div className="space-y-4 text-xs">
              <h3 className="text-sm font-bold text-slate-900">Workstation Preferences</h3>
              <p className="text-slate-500">Configure email digests, sprint notifications, and live alerts.</p>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <div>
                    <p className="font-semibold text-slate-800">PIRAE Risk Overload Alerts</p>
                    <p className="text-[11px] text-slate-500">Notify me whenever my weekly assigned tasks exceed capacity</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <div>
                    <p className="font-semibold text-slate-800">Comment Mentions (@)</p>
                    <p className="text-[11px] text-slate-500">Receive immediate desktop toast when tagged in a discussion</p>
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
