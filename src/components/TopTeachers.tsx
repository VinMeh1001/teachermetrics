import { Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const mockTeachers = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    institution: "Harvard University",
    subject: "Computer Science",
    rating: 4.9,
    location: "United States",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    institution: "Stanford University",
    subject: "Physics",
    rating: 4.8,
    location: "United States",
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Dr. Emma Williams",
    institution: "Oxford University",
    subject: "Literature",
    rating: 4.7,
    location: "United Kingdom",
    image: "https://i.pravatar.cc/150?img=3",
  },
];

const TopTeachers = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockTeachers.map((teacher) => (
        <Card key={teacher.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center gap-4">
            <img
              src={teacher.image}
              alt={teacher.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <CardTitle className="text-lg">{teacher.name}</CardTitle>
              <CardDescription>{teacher.institution}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{teacher.rating}</span>
            </div>
            <div className="text-sm text-gray-600">
              <p>{teacher.subject}</p>
              <p>{teacher.location}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TopTeachers;