import { FC } from "react";
import { useTranslation } from "react-i18next";
import WorldFlag from "react-world-flags";

const LanguageSwitcher: FC = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  const languages = [
    { code: "en", name: "EN", flag: "GB" },
    { code: "jp", name: "JP", flag: "JP" },
  ];

  return (
    <div className="relative inline-block pl-4 rounded-sm border border-gray-300">
      <select
        className="outline-none bg-transparent text-sm px-1.5  dark:text-white dark:bg-gray-800 appearance-none "
        value={i18n.language}
        onChange={handleLanguageChange}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none pl-1.5 pr-5 bg-[#f6f6f8] dark:bg-gray-800">
        {languages.map((lang) =>
          i18n.language === lang.code ? (
            <div key={lang.code} className="flex items-center space-x-1">
              <WorldFlag code={lang.flag} style={{ width: 15, height: 18 }} />
              <p className="text-gray-500 dark:text-white">{lang.name}</p>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
