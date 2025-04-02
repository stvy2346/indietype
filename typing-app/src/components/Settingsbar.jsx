import React, { useState } from "react";

const Settingbar = (props) => {
    const {
        initialTime,
        setInitialTime,
        theme,
        setTheme,
        language,
        setLanguage,
    } = props;
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const timeOptions = [15, 30, 45, 60];
    const themeOptions = ["Light", "Dark"];
    const languageOptions = [
        { value: "english", label: "English" },
        { value: "english_1k", label: "English 1K" },
        { value: "hinglish", label: "Hinglish" },
        { value: "telugu", label: "Telugu" },
        { value: "bengali", label: "Bengali" },
        { value: "marathi", label: "Marathi" },
        { value: "gujarati", label: "Gujarati" },
        { value: "malayalam", label: "Malayalam" },
        { value: "kannada", label: "Kannada" },
        { value: "punjabi", label: "Punjabi" },
        { value: "tamil", label: "Tamil" },
        { value: "weeb", label: "Weeb" },
        { value: "brainrot", label: "Brainrot" },
    ];

    const handleThemeChange = (themeOption) => {
        setTheme(themeOption);
        localStorage.setItem("theme", JSON.stringify(themeOption));
    };

    const handleTimeChange = (timeOption) => {
        if (initialTime !== timeOption) {
            setInitialTime(timeOption);
            localStorage.setItem("initialTime", JSON.stringify(timeOption));
        }
    };

    const handleLanguageChange = (e) => {
        const selectedLanguage = e.target.value;
        console.log(selectedLanguage);
        if (language !== selectedLanguage) {
            setLanguage(selectedLanguage);
            localStorage.setItem("language", JSON.stringify(selectedLanguage));
        }
    };

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const renderSettingsContent = () => (
        <>
            <div className="flex flex-col md:flex-row md:items-center gap-5">
                <div className="flex gap-5">
                    {timeOptions.map((timeOption) => (
                        <button
                            key={timeOption}
                            className={`${
                                initialTime === timeOption
                                    ? theme === "Dark"
                                        ? "text-blue-500"
                                        : "text-stone-700"
                                    : ""
                            } 
                                ${
                                    theme === "Dark"
                                        ? "hover:text-white"
                                        : "hover:text-stone-600"
                                }`}
                            onClick={() => handleTimeChange(timeOption)}
                        >
                            {timeOption}
                        </button>
                    ))}
                </div>
                <div
                    className={`${
                        theme === "Dark" ? "text-zinc-500" : "text-stone-400"
                    } text-2xl hidden md:block`}
                >
                    |
                </div>

                <div className="flex items-center">
                    <select
                        value={language || "english"}
                        onChange={handleLanguageChange}
                        className={`${
                            theme === "Dark"
                                ? "bg-zinc-600 text-white border-zinc-500"
                                : "bg-stone-100 text-stone-700 border-stone-300"
                        } 
                            border rounded px-2 py-1 focus:outline-none w-full md:w-auto`}
                    >
                        {languageOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div
                    className={`${
                        theme === "Dark" ? "text-zinc-500" : "text-stone-400"
                    } text-2xl hidden md:block`}
                >
                    |
                </div>

                <div className="flex gap-5">
                    {themeOptions.map((themeOption) => (
                        <button
                            key={themeOption}
                            className={`${
                                theme === themeOption
                                    ? theme === "Dark"
                                        ? "text-blue-500"
                                        : "text-stone-700"
                                    : ""
                            } 
                            ${
                                theme === "Dark"
                                    ? "hover:text-white"
                                    : "hover:text-stone-600"
                            }`}
                            onClick={() => handleThemeChange(themeOption)}
                        >
                            {themeOption}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );

    return (
        <>
            <div className="md:hidden mb-4">
                <button
                    onClick={togglePopup}
                    className={`${
                        theme === "Dark"
                            ? "bg-zinc-700 text-white"
                            : "bg-stone-200 text-stone-700"
                    } px-4 py-2 rounded-md flex items-center justify-center w-full`}
                >
                    Settings
                </button>
            </div>

            {isPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 md:hidden">
                    <div
                        className={`${
                            theme === "Dark"
                                ? "bg-zinc-800 text-zinc-500"
                                : "bg-white text-stone-400"
                        } p-5 rounded-lg w-11/12 max-w-sm`}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3
                                className={`${
                                    theme === "Dark"
                                        ? "text-white"
                                        : "text-stone-700"
                                } font-medium`}
                            >
                                Settings
                            </h3>
                            <button
                                onClick={togglePopup}
                                className={`${
                                    theme === "Dark"
                                        ? "text-white"
                                        : "text-stone-700"
                                }`}
                            >
                                ✕
                            </button>
                        </div>
                        {renderSettingsContent()}
                    </div>
                </div>
            )}

            <div
                className={`${
                    theme === "Dark"
                        ? "bg-zinc-700 text-zinc-500"
                        : "bg-stone-200 text-stone-400"
                } px-4 py-2 rounded-md items-center max-w-[32rem] gap-5 mb-10 hidden md:flex`}
            >
                {renderSettingsContent()}
            </div>
        </>
    );
};

export default Settingbar;
