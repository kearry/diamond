// src/app/(components)/FilterDropdown.tsx
"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

function FilterDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                    Showing all categories <ChevronDownIcon className="w-4 h-4 ml-2" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filter by category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logic bug</DropdownMenuItem>
                <DropdownMenuItem>Security issue</DropdownMenuItem>
                <DropdownMenuItem>Accidentally committed code</DropdownMenuItem>
                <DropdownMenuItem>Performance issue</DropdownMenuItem>
                <DropdownMenuItem>Code quality/style</DropdownMenuItem>
                <DropdownMenuItem>Documentation issue</DropdownMenuItem>
                <DropdownMenuItem>Potential edge case</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default FilterDropdown;