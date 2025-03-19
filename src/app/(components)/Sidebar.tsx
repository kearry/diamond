// src/app/(components)/Sidebar.tsx
import Link from 'next/link';
import { HomeIcon, CogIcon, QueueListIcon } from '@heroicons/react/24/outline'; // Corrected import

function Sidebar() {
    return (
        <div className="w-64 bg-gray-100 p-4">
            <ul>
                <li>
                    <Link href="/dashboard" className="flex items-center p-2 hover:bg-gray-200 rounded">
                        <HomeIcon className="w-5 h-5 mr-2" />
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link href="/settings" className="flex items-center p-2 hover:bg-gray-200 rounded">
                        <CogIcon className="w-5 h-5 mr-2" /> {/* Use CogIcon */}
                        Settings
                    </Link>
                </li>
                <li>
                    <Link href="/repositories" className="flex items-center p-2 hover:bg-gray-200 rounded">
                        <QueueListIcon className="w-5 h-5 mr-2" />
                        Repositories
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;