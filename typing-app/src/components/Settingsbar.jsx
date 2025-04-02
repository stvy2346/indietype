import React from "react";

const Settingbar = (props) => {
    const {
        initialTime,
        setInitialTime,
        theme,
        setTheme,
        language,
        setLanguage,
    } = props;
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

    return (
        <div
            className={`${
                theme === "Dark"
                    ? "bg-zinc-700 text-zinc-500"
                    : "bg-stone-200 text-stone-400"
            } px-4 py-2 rounded-md flex items-center max-w-[32rem] gap-5 mb-10 flex-wrap`}
        >
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
                } text-2xl`}
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
                        border rounded px-2 py-1 focus:outline-none`}
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
                } text-2xl`}
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
    );
};

export default Settingbar;
