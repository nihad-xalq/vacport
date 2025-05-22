
import { FiPlus, FiSearch, FiBookmark, FiSettings } from "react-icons/fi";

const QuickActions = () => {
    return (
        <div className="hidden lg:block w-80 border-l border-gray-200 p-6">
            <div className="sticky top-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="space-y-4">
                    <button className="w-full flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <FiPlus className="w-5 h-5" />
                        Post New Job
                    </button>
                    <button className="w-full flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <FiSearch className="w-5 h-5" />
                        Search Jobs
                    </button>
                    <button className="w-full flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <FiBookmark className="w-5 h-5" />
                        Saved Jobs
                    </button>
                    <button className="w-full flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <FiSettings className="w-5 h-5" />
                        Settings
                    </button>
                </div>

                <div className="mt-8">
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Recent Activity</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-600">New job posted</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-600">Application received</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <span className="text-gray-600">Profile updated</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuickActions;
