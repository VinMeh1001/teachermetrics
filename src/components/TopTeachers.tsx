import { Star, School, Linkedin, Github, Trophy, Award, GraduationCap } from "lucide-react";
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
    department: "Computer Science Department",
    subject: "Computer Science",
    rating: 4.9,
    location: "United States",
    image: "https://i.pravatar.cc/150?img=1",
    socialLinks: {
      linkedin: "https://linkedin.com/in/sarahjohnson",
      github: "https://github.com/sarahjohnson",
    },
    achievements: [
      {
        type: "research",
        title: "Best Paper Award at ICML 2023",
        description: "Machine Learning Research Excellence",
      },
      {
        type: "award",
        title: "Outstanding Faculty Award",
        description: "Excellence in Teaching and Research",
      },
      {
        type: "publication",
        title: "Published in Nature",
        description: "Breakthrough in AI Research",
      },
    ],
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    institution: "Stanford University",
    department: "Physics Department",
    subject: "Physics",
    rating: 4.8,
    location: "United States",
    image: "https://i.pravatar.cc/150?img=2",
    socialLinks: {
      linkedin: "https://linkedin.com/in/michaelchen",
      github: "https://github.com/michaelchen",
    },
    achievements: [
      {
        type: "award",
        title: "Nobel Prize Nomination",
        description: "Quantum Computing Research",
      },
      {
        type: "research",
        title: "Research Grant $2M",
        description: "Quantum Physics Innovation",
      },
    ],
  },
  {
    id: 3,
    name: "Dr. Emma Williams",
    institution: "Oxford University",
    department: "Literature Department",
    subject: "Literature",
    rating: 4.7,
    location: "United Kingdom",
    image: "https://i.pravatar.cc/150?img=3",
    socialLinks: {
      linkedin: "https://linkedin.com/in/emmawilliams",
    },
    achievements: [
      {
        type: "award",
        title: "Literary Excellence Award",
        description: "Contemporary Literature Studies",
      },
      {
        type: "publication",
        title: "Published Book",
        description: "Modern Poetry Analysis",
      },
    ],
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
            <div className="flex-1">
              <CardTitle className="text-lg">{teacher.name}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <School className="w-4 h-4" />
                {teacher.institution}
              </CardDescription>
              <div className="flex gap-2 mt-2">
                {teacher.socialLinks.linkedin && (
                  <a
                    href={teacher.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {teacher.socialLinks.github && (
                  <a
                    href={teacher.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{teacher.rating}</span>
            </div>
            <div className="text-sm text-gray-600 space-y-3">
              <p>{teacher.department}</p>
              <p>{teacher.subject}</p>
              <p>{teacher.location}</p>
              <div className="border-t pt-3 mt-3">
                <h4 className="font-semibold text-primary mb-2">Achievements</h4>
                {teacher.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-2 mb-2">
                    {achievement.type === "research" && <Trophy className="w-4 h-4 text-blue-500" />}
                    {achievement.type === "award" && <Award className="w-4 h-4 text-yellow-500" />}
                    {achievement.type === "publication" && <GraduationCap className="w-4 h-4 text-green-500" />}
                    <div>
                      <p className="font-medium">{achievement.title}</p>
                      <p className="text-sm text-gray-500">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TopTeachers;