"use client";

import { Download, Eye, Mail, MapPin, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { personal } from "@/data/personal";
import { RESUME_FILE_NAME, RESUME_PATH, useResumeViewer } from "@/components/resume/ResumeViewer";

const iconCls = "h-4 w-4 text-[var(--text-muted)]";

export function ResumeContactList() {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--text-secondary)]">
      <li className="inline-flex items-center gap-2">
        <MapPin className={iconCls} aria-hidden />
        {personal.location}
      </li>
      <li>
        <a href={`mailto:${personal.email}`} className="inline-flex items-center gap-2 hover:text-[var(--text-primary)]">
          <Mail className={iconCls} aria-hidden />
          {personal.email}
        </a>
      </li>
      <li>
        <a href={`tel:${personal.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 hover:text-[var(--text-primary)]">
          <Phone className={iconCls} aria-hidden />
          {personal.phone}
        </a>
      </li>
    </ul>
  );
}

export function ResumeActions() {
  const { open } = useResumeViewer();
  const iconBtn =
    "btn-secondary inline-flex h-10 w-10 items-center justify-center rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)]";

  return (
    <div className="no-print flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className="btn-primary inline-flex h-10 items-center gap-2 rounded-lg px-5 text-sm font-semibold"
      >
        <Eye className="h-4 w-4" aria-hidden /> View PDF
      </button>
      <a
        href={RESUME_PATH}
        download={RESUME_FILE_NAME}
        className="btn-secondary inline-flex h-10 items-center gap-2 rounded-lg px-5 text-sm font-semibold"
      >
        <Download className="h-4 w-4" aria-hidden /> Download
      </a>
      <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconBtn}>
        <LinkedinIcon className="h-4 w-4" aria-hidden />
      </a>
      <a href={personal.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconBtn}>
        <GithubIcon className="h-4 w-4" aria-hidden />
      </a>
    </div>
  );
}
