import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

function Navbar() {
    return (
        <nav className="bg-blue-600 dark:bg-blue-800 text-white shadow-lg transition-colors">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="text-xl font-bold">
                        Pokémon Explorer
                    </Link>
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="hover:text-gray-200">
                            Home
                        </Link>
                        <Link to="/favorites" className="hover:text-gray-200">
                            Favorites
                        </Link>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
