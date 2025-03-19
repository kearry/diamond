// src/app/(components)/SettingsForm.tsx
"use client";
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from '@/components/ui/textarea';


function SettingsForm() {
    const [open, setOpen] = useState(false);
    const [filterRules, setFilterRules] = useState<string>("");
    const [customRules, setCustomRules] = useState<string>("");

    const handleSaveSettings = async () => {
        //  Implement saving logic here, perhaps using fetch to a backend API
        console.log("Filter Rules:", filterRules);
        console.log("Custom Rules:", customRules)
        //  Close the dialog after saving
        setOpen(false);
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Settings</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Diamond Settings</DialogTitle>
                    <DialogDescription>
                        Configure Diamond's behavior.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="filterRules">Filters</Label>
                        <Textarea
                            id="filterRules"
                            placeholder="Define information to consider when determining types of comments not to leave."
                            value={filterRules}
                            onChange={(e) => setFilterRules(e.target.value)}
                        />
                        Examples:
                        <ul>
                            <li>It is fine for critics to have generic success/error messages.</li>
                            <li>Dialogs do not need explicit onClose handlers.</li>
                        </ul>
                    </div>
                    <div>
                        <Label htmlFor="customRules">Custom Rules</Label>
                        <Textarea
                            id="customRules"
                            placeholder="Define rules to detect issues in your codebase in addition to general bugs."
                            value={customRules}
                            onChange={(e) => setCustomRules(e.target.value)}
                        />
                        Examples:
                        <ul>
                            <li>If a function definition contains a parameter named "context" that context should be the last parameter.</li>
                        </ul>
                    </div>

                    <div>
                        <Label>Add from template</Label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Select a template</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Templates</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Accessibility</DropdownMenuItem>
                                <DropdownMenuItem>Go style guide (Google)</DropdownMenuItem>
                                <DropdownMenuItem>TypeScript style guide (Google)</DropdownMenuItem>
                                <DropdownMenuItem>Security: OWASP</DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                </div>
                <div className="flex justify-end mt-4">
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSaveSettings}>Save</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default SettingsForm;