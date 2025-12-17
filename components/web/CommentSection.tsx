import { MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";

const CommentSection = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 border-b">
        <MessageSquare className="size-5" />
        <h2 className="text-xl font-semibold">4 Comments</h2>
      </CardHeader>
      <CardContent>
        <form action=""></form>
      </CardContent>
    </Card>
  );
};

export default CommentSection;
