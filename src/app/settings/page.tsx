// src/app/settings/page.tsx
import SettingsForm from '../(components)/SettingsForm';

function SettingsPage() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <SettingsForm />
        </div>
    );
}

export default SettingsPage;