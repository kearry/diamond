// src/app/(components)/IssueBarChart.tsx
"use client"
import React from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface IssueBarChartProps {
    stats: {
        counts: { [key: string]: number };
        percentages: { [key: string]: string };
    };
}

const IssueBarChart: React.FC<IssueBarChartProps> = ({ stats }) => {

    const colors: { [key: string]: string } = {
        "Potential edge case": "bg-orange-500",
        "Documentation issue": "bg-red-500",
        "Code quality/style": "bg-purple-500",
        "Performance issue": "bg-teal-500",
        "Accidentally committed code": "bg-yellow-500",
        "Security issue": "bg-blue-500",
        "Logic bug": "bg-green-500",
    };

    const barHeight = 20;
    const totalWidth = 100; // Total width in percentage

    let cumulativeWidth = 0;

    return (
        <TooltipProvider>
            <div className="flex flex-col items-start w-full">
                <div className="flex w-full h-5">
                    {Object.entries(stats.percentages).map(([type, percentage]) => {
                        const width = parseFloat(percentage);
                        const barStyle = {
                            width: `${width}%`,
                            backgroundColor: colors[type] || 'bg-gray-400', // Default color
                        };

                        const tooltipContent = (
                            <div>
                                <strong>{type}</strong>
                                <br />
                                {stats.counts[type]} issues ({percentage}%)
                                <br />
                                {/* Add your descriptions here, you can fetch them from a map or object */}
                                {type === "Potential edge case" && (
                                    <div>Issues that only occur under unusual or extreme conditions that weren't sufficiently tested.</div>
                                )}
                                {type === "Documentation issue" && (
                                    <div>Missing, outdated, or incorrect documentation that makes code harder to understand or use properly.</div>
                                )}
                                {type === "Code quality/style" && (
                                    <div>Problems with readability, maintainability, or violations of coding standards without affecting functionality.</div>
                                )}
                            </div>
                        );

                        cumulativeWidth += width;

                        return (
                            <Tooltip key={type}>
                                <TooltipTrigger asChild>
                                    <div
                                        style={barStyle}
                                        className="h-full" // Use full height of the container
                                    ></div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {tooltipContent}
                                </TooltipContent>
                            </Tooltip>
                        );
                    })}
                </div>
                {/* Legend/Labels */}
                <div className="flex flex-wrap mt-2">
                    {Object.entries(colors).map(([type, color]) => (
                        <div key={type} className="flex items-center mr-4">
                            <div className={`w-4 h-4 rounded-full mr-1 ${color}`}></div>
                            <span className="text-sm">{type}</span>
                        </div>
                    ))}
                </div>
            </div>
        </TooltipProvider>
    );
};

export default IssueBarChart;