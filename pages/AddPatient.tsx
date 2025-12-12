import React, { useState } from 'react';

const AddPatient: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-6 font-display max-w-7xl mx-auto w-full pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-white text-4xl font-black leading-tight">New Patient Enrollment</h1>
        <p className="text-white/60 text-base">Ingest genomic data (VCF) and create a new digital twin profile for analysis.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Demographics */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <section className="frosted-glass rounded-xl p-6 border border-white/10">
            <h2 className="text-info text-xl font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined">id_card</span>
              Patient Demographics
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-white/80 text-sm font-medium">First Name</label>
                <input type="text" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all" placeholder="e.g. Sarah" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white/80 text-sm font-medium">Last Name</label>
                <input type="text" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all" placeholder="e.g. Connor" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white/80 text-sm font-medium">Date of Birth</label>
                <input type="date" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white/80 text-sm font-medium">Biological Sex</label>
                <div className="relative">
                  <select className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all">
                    <option value="" disabled selected>Select sex</option>
                    <option value="F">Female</option>
                    <option value="M">Male</option>
                    <option value="I">Intersex</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none">expand_more</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-white/80 text-sm font-medium">Internal Reference ID</label>
                <div className="relative">
                   <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/30">qr_code</span>
                   <input type="text" className="w-full bg-black/20 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white/60 font-mono" value="PID-GEN-2024-X99" readOnly />
                   <button className="absolute right-2 top-1/2 -translate-y-1/2 text-xs bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded">Auto-Generate</button>
                </div>
              </div>
            </div>
          </section>

          <section className="frosted-glass rounded-xl p-6 border border-white/10">
            <h2 className="text-info text-xl font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined">clinical_notes</span>
              Clinical Phenotypes
            </h2>
            <p className="text-white/50 text-sm mb-4">Enter known conditions or HPO terms to assist the variant prioritization engine.</p>
            <textarea 
              className="w-full bg-black/20 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 min-h-[120px]"
              placeholder="e.g. Cardiomyopathy, Arrhythmia, Fatigue..."
            ></textarea>
          </section>
        </div>

        {/* Right Column: Genomic Upload */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <section className="frosted-glass rounded-xl p-6 border border-white/10 h-full flex flex-col">
            <h2 className="text-white text-xl font-bold mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-helix-violet">dna</span>
              Genomic Data Ingestion
            </h2>
            <p className="text-white/50 text-sm mb-6">Upload raw VCF files. Compressed (.vcf.gz) files are recommended for faster processing.</p>
            
            <div 
              className={`flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-xl transition-all p-8 relative ${
                dragActive 
                  ? 'border-primary bg-primary/10' 
                  : 'border-white/10 bg-black/20 hover:bg-black/30'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                accept=".vcf,.vcf.gz"
                onChange={handleFileChange}
              />
              
              {!file ? (
                <>
                  <div className="size-20 rounded-full bg-white/5 flex items-center justify-center mb-4 ring-1 ring-white/10">
                    <span className="material-symbols-outlined text-4xl text-helix-violet">cloud_upload</span>
                  </div>
                  <p className="text-white font-bold text-lg">Click or Drag VCF File Here</p>
                  <p className="text-white/40 text-sm mt-2">Max file size: 5GB</p>
                </>
              ) : (
                <div className="flex flex-col items-center animate-pulse">
                  <div className="size-20 rounded-full bg-green-500/20 flex items-center justify-center mb-4 ring-1 ring-green-500/50">
                    <span className="material-symbols-outlined text-4xl text-green-500">check</span>
                  </div>
                  <p className="text-white font-bold text-lg break-all text-center">{file.name}</p>
                  <p className="text-green-400 text-sm mt-2 font-mono">{(file.size / (1024 * 1024)).toFixed(2)} MB • Ready for analysis</p>
                  <button 
                    onClick={(e) => { e.preventDefault(); setFile(null); }}
                    className="mt-4 text-xs text-white/50 hover:text-white underline z-10 relative"
                  >
                    Remove File
                  </button>
                </div>
              )}
            </div>

            {/* Analysis Options */}
            <div className="mt-6 flex flex-col gap-3">
              <label className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                <input type="checkbox" className="form-checkbox text-primary rounded bg-white/10 border-white/20 focus:ring-0" defaultChecked />
                <div className="flex flex-col">
                  <span className="text-white text-sm font-bold">Run Polygenic Risk Scoring (PRS)</span>
                  <span className="text-white/40 text-xs">Calculate risk for Cardio & Metabolic traits</span>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                 <input type="checkbox" className="form-checkbox text-primary rounded bg-white/10 border-white/20 focus:ring-0" defaultChecked />
                 <div className="flex flex-col">
                   <span className="text-white text-sm font-bold">Pharmacogenomics Panel</span>
                   <span className="text-white/40 text-xs">Screen for drug-gene interactions</span>
                 </div>
              </label>
            </div>
          </section>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
        <button className="h-12 px-8 rounded-lg border border-white/10 bg-white/5 text-white font-bold hover:bg-white/10 transition-colors">
          Cancel
        </button>
        <button 
          className="h-12 px-8 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-[0_0_20px_rgba(112,0,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          disabled={!file}
        >
          <span className="material-symbols-outlined">analytics</span>
          Register & Analyze Genome
        </button>
      </div>
    </div>
  );
};

export default AddPatient;