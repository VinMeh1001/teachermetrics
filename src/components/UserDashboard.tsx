import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThumbsUp, MessageSquare, Award, Star } from "lucide-react";

const mockRemarks = [
  {
    id: 1,
    from: "Dr. Sarah Johnson",
    message: "Excellent participation in class discussions!",
    date: "2024-02-20",
    type: "teacher",
  },
  {
    id: 2,
    from: "John Smith",
    message: "Great team player during the science project",
    date: "2024-02-19",
    type: "colleague",
  },
];

const mockStats = {
  ratingsGiven: 15,
  averageRating: 4.8,
  totalRemarks: 24,
  achievements: 3,
};

const UserDashboard = () => {
  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ratings Given</CardTitle>
            <ThumbsUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.ratingsGiven}</div>
          </CardContent>
        </Card>
        <Card className="bg-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.averageRating}</div>
          </CardContent>
        </Card>
        <Card className="bg-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Remarks</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalRemarks}</div>
          </CardContent>
        </Card>
        <Card className="bg-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Award className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.achievements}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Recent Remarks</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {mockRemarks.map((remark) => (
                <div
                  key={remark.id}
                  className="flex items-start space-x-4 p-4 rounded-lg bg-white/70 hover:bg-white/90 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm">{remark.from}</h4>
                      <span className="text-xs text-gray-500">{remark.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {remark.message}
                    </p>
                    <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {remark.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;