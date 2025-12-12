import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 font-sans max-w-5xl mx-auto w-full">
      <div>
        <h1 className="text-white text-4xl font-bold tracking-tight">Settings</h1>
        <p className="text-gray-400 text-base font-normal mt-2">Manage your profile, notifications, and application settings.</p>
      </div>

      {/* Profile Section */}
      <section className="frosted-glass rounded-xl p-6 border border-white/10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-5">
            <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-24 shrink-0 ring-4 ring-white/5" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBcq8D0vzhhnxAgFoK5C4eVZ8ZpJV2qsMqG9XQ_pt0nbevVleF9djbWwOpQ5UoJcPn1PVC9MMqQIOCpaeaeNBHuHkF5WxJ9Pr6vZlIGUM6UYoqDkEPgnbYAl4tgSCzRp85jRLbPBViJ6IvHUNyyEyXuHpdp8fsAl8uELoeLbaIo4iovlI5uc9Gz-8NpnqeuapaEEEniQCG7LlvmFeg_dk-8ziV689EvNsCINa7NPWTpesyXdN5Eo8TtfF05IQS50vrPdf7zhh2greE")' }}
            ></div>
            <div className="flex flex-col">
              <p className="text-white text-2xl font-bold">Dr. Anya Sharma</p>
              <p className="text-info text-base font-normal">Cardiologist</p>
            </div>
          </div>
          <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-colors w-full md:w-auto">
            <span className="truncate">Upload new picture</span>
          </button>
        </div>

        <h2 className="text-info text-xl font-bold pt-6 pb-4">Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col">
            <p className="text-gray-300 text-sm font-medium pb-2">Full Name</p>
            <input className="rounded-lg text-white border border-white/20 bg-black/20 h-12 px-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" defaultValue="Dr. Anya Sharma"/>
          </label>
          <label className="flex flex-col">
            <p className="text-gray-300 text-sm font-medium pb-2">Email Address</p>
            <input className="rounded-lg text-gray-400 border border-white/20 bg-black/20 h-12 px-4 text-sm cursor-not-allowed" readOnly defaultValue="anya.sharma@chromapilot.io"/>
          </label>
          <label className="flex flex-col">
            <p className="text-gray-300 text-sm font-medium pb-2">Specialization</p>
            <input className="rounded-lg text-white border border-white/20 bg-black/20 h-12 px-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" defaultValue="Cardiology"/>
          </label>
          <label className="flex flex-col">
            <p className="text-gray-300 text-sm font-medium pb-2">Practice / Hospital Name</p>
            <input className="rounded-lg text-white border border-white/20 bg-black/20 h-12 px-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" defaultValue="Bio-Health Institute"/>
          </label>
        </div>
      </section>

      {/* Notifications */}
      <section className="frosted-glass rounded-xl p-6 border border-white/10">
        <h2 className="text-info text-xl font-bold pb-4 border-b border-white/10">Notification Preferences</h2>
        <div className="divide-y divide-white/10">
           {[
               { title: 'Enable Notifications', desc: 'Master control for all notifications.', checked: true },
               { title: 'Critical Patient Alerts', desc: 'Immediate alerts for high-risk bio-collisions.', checked: true },
               { title: 'System Updates', desc: 'Updates about the Chroma-Pilot platform.', checked: false },
               { title: 'Appointment Reminders', desc: 'Notifications for upcoming patient appointments.', checked: true },
           ].map((item, i) => (
             <div key={i} className="flex justify-between items-center py-4">
                <div>
                  <p className="font-medium text-white">{item.title}</p>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
                <div className="relative inline-block w-12 h-6 rounded-full bg-gray-600 transition duration-200 ease-in cursor-pointer">
                    <input 
                        type="checkbox" 
                        defaultChecked={item.checked} 
                        className="peer absolute w-full h-full opacity-0 cursor-pointer"
                    />
                    <span className="block w-full h-full rounded-full bg-gray-600 peer-checked:bg-primary transition-colors"></span>
                    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></span>
                </div>
             </div>
           ))}
        </div>
      </section>

      <div className="flex justify-end gap-4 pb-10">
        <button className="rounded-lg h-11 px-6 bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-colors">Cancel</button>
        <button className="rounded-lg h-11 px-6 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors">Save Changes</button>
      </div>
    </div>
  );
};

export default Settings;