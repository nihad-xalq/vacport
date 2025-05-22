import { locales, languageNames, type Locale } from "@/i18n/config";
import { useRouter, usePathname } from "next/navigation";
import Select, { SingleValue } from "react-select";
import React, { FC } from "react";

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

interface LanguageOption {
  value: Locale;
  label: React.ReactElement;
}

const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ currentLocale }) => {
  const router = useRouter();
  const pathname = usePathname();

  const options: LanguageOption[] = locales.map((locale) => ({
    value: locale,
    label: (
      <div className="flex items-center gap-2">
        {/* <span>{languageFlags[locale]}</span> */}
        <span>{languageNames[locale]}</span>
      </div>
    ),
  }));

  const handleChange = (option: SingleValue<LanguageOption>) => {
    if (!option) return;

    const newLocale = option.value;

    // Split the pathname into segments
    const segments = pathname.split('/');

    // Find the locale segment index (should be the first segment after the empty string)
    const localeIndex = segments.findIndex((segment) =>
      locales.includes(segment as Locale)
    );

    if (localeIndex !== -1) {
      // Replace the existing locale with the new one
      segments[localeIndex] = newLocale;
    } else {
      // If no locale found, insert it after the first empty segment
      segments.splice(1, 0, newLocale);
    }

    // Reconstruct the path
    const newPath = segments.join('/');
    router.push(newPath);
  };

  return (
    <Select
      options={options}
      value={options.find((option) => option.value === currentLocale)}
      onChange={handleChange}
      isSearchable={false}
      className="w-32 md:w-max"
      classNamePrefix="language-select"
      components={{
        IndicatorSeparator: () => null,
      }}
      styles={{
        control: (base) => ({
          ...base,
          minHeight: "32px",
          height: "32px",
          border: "1px solid #e5e7eb",
          borderRadius: "0.375rem",
          boxShadow: "none",
          "&:hover": {
            borderColor: "#e5e7eb",
          },
          cursor: "pointer",
        }),
        valueContainer: (base) => ({
          ...base,
          padding: "0 8px",
        }),
        singleValue: (base) => ({
          ...base,
          fontSize: "0.75rem",
          color: "#4b5563",
          fontWeight: "500",
        }),
        menu: (base) => ({
          ...base,
          fontSize: "0.875rem",
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isSelected
            ? "#2563eb"
            : state.isFocused
              ? "#f3f4f6"
              : "white",
          color: state.isSelected ? "white" : "#1f2937",
          "&:hover": {
            backgroundColor: state.isSelected ? "#2563eb" : "#f3f4f6",
            cursor: "pointer",
          },
        }),
        dropdownIndicator: (base) => ({
          ...base,
          padding: 0,
          paddingRight: "4px",
        }),
      }}
    />
  );
};

export default LanguageSwitcher;
