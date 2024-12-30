import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
        >
            {isDarkMode ? (
                <SunIcon className="h-6 w-6 text-yellow-400" />
            ) : (
                <MoonIcon className="h-6 w-6 text-gray-800" />
            )}
        </button>
    );
}

export default ThemeToggle;
