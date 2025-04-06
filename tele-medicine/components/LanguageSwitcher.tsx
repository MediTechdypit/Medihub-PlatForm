"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const languages = [
  { code: "en", label: "English" },
  { code: "mr", label: "मराठी" },
  { code: "hi", label: "हिंदी" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  // Function to change language
  const changeLanguage = (locale: string) => {
    // Get the current URL path without the existing locale
    const segments = pathname.split("/").filter(Boolean);
    if (languages.some((lang) => lang.code === segments[0])) {
      segments[0] = locale; // Replace existing locale
    } else {
      segments.unshift(locale); // Add new locale
    }
    router.push(`/${segments.join("/")}`);
  };

  return (
    <select
      onChange={(e) => changeLanguage(e.target.value)}
      className="border rounded p-2"
    >
      {languages.map(({ code, label }) => (
        <option key={code} value={code}>
          {label}
        </option>
      ))}
    </select>
  );
}
