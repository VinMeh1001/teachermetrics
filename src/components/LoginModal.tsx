import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal = ({ open, onClose }: LoginModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Welcome to EduRate</h2>
          <p className="text-gray-600">Sign in to start rating and connecting</p>
        </div>
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 py-6"
            onClick={() => console.log("Google login")}
          >
            <Mail className="w-5 h-5" />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 py-6"
            onClick={() => console.log("Facebook login")}
          >
            <Facebook className="w-5 h-5" />
            Continue with Facebook
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 py-6"
            onClick={() => console.log("Twitter login")}
          >
            <Twitter className="w-5 h-5" />
            Continue with Twitter
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 py-6"
            onClick={() => console.log("Instagram login")}
          >
            <Instagram className="w-5 h-5" />
            Continue with Instagram
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;