import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import axios from 'axios';

interface SearchResult {
    id: number;
    name: string;
    country: string;
    type: "college" | "teacher" | "student";
    institution?: string; // Optional for teachers and students
}

interface CollegeSearchProps {
    onSelect: (result: SearchResult) => void;
}

const CollegeSearch = ({ onSelect }: CollegeSearchProps) => {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [colleges, setColleges] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const apiKey = 'AIzaSyAn94lwvUD8OqfBQxGgsTuEWr-oilb9c3U'; // Replace with your actual Google Places API key

    // Function to fetch colleges from the Google Places API
    const fetchColleges = async (city: string) => {
        setLoading(true);
        setError(null);

        try {
            const endpoint = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
            const query = `colleges in ${city}`;
            const response = await axios.get(endpoint, {
                params: { query, key: apiKey }
            });

            if (response.data.results) {
                const fetchedColleges = response.data.results.map((college, index) => ({
                    id: index + 1,
                    name: college.name + ' ' + college.formatted_address,
                    country: college.formatted_address.split(",").pop().trim(),
                    type: 'college' // Assigning type as 'college'
                }));
                setColleges(fetchedColleges);
            } else {
                setError('No results found');
            }
        } catch (err) {
            console.error('Error fetching data from Google Places API:', err);
            setError('Failed to retrieve data');
        } finally {
            setLoading(false);
        }
    };

    // Trigger fetch when search value changes
    const handleSearchChange = (value: string) => {
        setSearchValue(value);
        if (value.length > 2) { // Fetch only if input length is greater than 2
            fetchColleges(value); // Call fetch with the city name
        }
    };

    // Mock data for testing purposes
    const mockData = {
        colleges: [
            { id: 1, name: "Harvard University", country: "United States", type: "college" },
            { id: 2, name: "Oxford University", country: "United Kingdom", type: "college" },
            { id: 3, name: "Stanford University", country: "United States", type: "college" },
        ],
        teachers: [
            { id: 1, name: "Dr. Sarah Johnson", country: "United States", type: "teacher", institution: "Harvard University" },
            { id: 2, name: "Prof. James Smith", country: "United Kingdom", type: "teacher", institution: "Oxford University" },
        ],
        students: [
            { id: 1, name: "Alex Thompson", country: "United States", type: "student", institution: "Harvard University" },
            { id: 2, name: "James Wilson", country: "United Kingdom", type: "student", institution: "Oxford University" },
        ],
    };

    // Filtering logic based on search value
    const filterResults = (query: string): SearchResult[] => {
        const lowercaseQuery = query.toLowerCase();
        const results: SearchResult[] = [];
        
        // Search colleges
        results.push(...mockData.colleges.filter(college =>
            college.name.toLowerCase().includes(lowercaseQuery) ||
            college.country.toLowerCase().includes(lowercaseQuery)
        ));

        // Search teachers
        results.push(...mockData.teachers.filter(teacher =>
            teacher.name.toLowerCase().includes(lowercaseQuery) ||
            teacher.country.toLowerCase().includes(lowercaseQuery)
        ));

        // Search students
        results.push(...mockData.students.filter(student =>
            student.name.toLowerCase().includes(lowercaseQuery) ||
            student.country.toLowerCase().includes(lowercaseQuery)
        ));

        return results;
    };

    const filteredResults = filterResults(searchValue);

    // Grouping results by type for display
    const groupedResults = {
        colleges: filteredResults.filter(r => r.type === "college"),
        teachers: filteredResults.filter(r => r.type === "teacher"),
        students: filteredResults.filter(r => r.type === "student"),
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div className="relative">
                    <Input 
                        placeholder="Search colleges, teachers, or students..." 
                        value={searchValue} 
                        onChange={(e) => handleSearchChange(e.target.value)} 
                        className="pl-10" 
                    />
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0" align="start">
                <Command>
                    <CommandInput placeholder="Search..." value={searchValue} onValueChange={setSearchValue} />
                    <CommandList>
                        {loading && <div>Loading...</div>}
                        {error && <div>Error: {error}</div>}
                        {groupedResults.colleges.length > 0 && (
                            <CommandGroup heading="Colleges">
                                {groupedResults.colleges.map((result) => (
                                    <CommandItem key={`college-${result.id}`} value={result.name} onSelect={() => {
                                        onSelect(result);
                                        setSearchValue(result.name);
                                        setOpen(false);
                                    }} className="flex items-center justify-between">
                                        <span>{result.name}</span>
                                        <span className="text-sm text-gray-500">{result.country}</span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                        {groupedResults.teachers.length > 0 && (
                            <CommandGroup heading="Teachers">
                                {groupedResults.teachers.map((result) => (
                                    <CommandItem key={`teacher-${result.id}`} value={result.name} onSelect={() => {
                                        onSelect(result);
                                        setSearchValue(result.name);
                                        setOpen(false);
                                    }} className="flex items-center justify-between">
                                        <div>
                                            <span>{result.name}</span>
                                            <span className="text-sm text-gray-500 block">{result.institution}</span>
                                        </div>
                                        <span className="text-sm text-gray-500">{result.country}</span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                        {groupedResults.students.length > 0 && (
                            <CommandGroup heading="Students">
                                {groupedResults.students.map((result) => (
                                    <CommandItem key={`student-${result.id}`} value={result.name} onSelect={() => {
                                        onSelect(result);
                                        setSearchValue(result.name);
                                        setOpen(false);
                                    }} className="flex items-center justify-between">
                                        <div>
                                            <span>{result.name}</span>
                                            <span className="text-sm text-gray-500 block">{result.institution}</span>
                                        </div>
                                        <span className="text-sm text-gray-500">{result.country}</span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                        {!loading && !error && !filteredResults.length && (
                            <CommandEmpty>No results found.</CommandEmpty>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default CollegeSearch;
