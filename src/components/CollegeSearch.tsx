import { useState, useEffect } from "react";
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
import axios from 'axios'; // Import axios

interface SearchResult {
    id: number;
    name: string;
    country: string;
    type: "college" | "teacher" | "student";
    institution?: string;
}

interface CollegeSearchProps {
    onSelect: (result: SearchResult) => void;
}

const CollegeSearch = ({ onSelect }: CollegeSearchProps) => {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [colleges, setColleges] = useState<SearchResult[]>([]); // State for colleges
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state

    const apiKey = 'AIzaSyAn94lwvUD8OqfBQxGgsTuEWr-oilb9c3U'; // Replace with your actual Google Places API key
    const city = 'New York'; // Replace with the desired city

    // Function to fetch colleges based on city
    const fetchColleges = async () => {
        try {
            const endpoint = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
            const query = `colleges in ${city}`;
            const response = await axios.get(endpoint, {
                params: {
                    query: query,
                    key: apiKey
                }
            });

            if (response.data.results) {
                const fetchedColleges = response.data.results.map((college, index) => ({
                    id: index + 1,
                    name: college.name + ' ' + college.formatted_address,
                    country: college.formatted_address.split(",").pop().trim(),
                    type: 'college'
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

    // Fetch colleges when component mounts
    useEffect(() => {
        fetchColleges();
    }, []);

    const filterResults = (query: string): SearchResult[] => {
        const lowercaseQuery = query.toLowerCase();
        return colleges.filter(college =>
            college.name.toLowerCase().includes(lowercaseQuery) ||
            college.country.toLowerCase().includes(lowercaseQuery)
        );
    };

    const filteredResults = filterResults(searchValue);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div className="relative">
                    <Input
                        placeholder="Search colleges..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="pl-10"
                    />
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0" align="start">
                <Command>
                    <CommandInput placeholder="Search..." value={searchValue} onValueChange={setSearchValue} />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        {loading && <div>Loading...</div>}
                        {error && <div>Error: {error}</div>}
                        {filteredResults.length > 0 && (
                            <CommandGroup heading="Colleges">
                                {filteredResults.map((result) => (
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
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default CollegeSearch;








