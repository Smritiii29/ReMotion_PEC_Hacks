import { ChevronDown, Leaf } from "lucide-react";
import avatarSana from "@/assets/avatar-sana.png";
import { Link } from "react-router-dom";

interface HeaderProps {
  userName?: string;
  userRole?: string;
}

const Header = ({ userName = "Sana", userRole = "Student" }: HeaderProps) => {
  return (
    <div className=" px-6 py-4 bg-gradient-to-b from-[#289997] to-[#e0f2f0]">
      <header className="flex items-center justify-between mb-4">
        <div>
          <h1 className="flex items-center gap-2 text-4xl font-bold px-10">
            Your Recovery, Today
            <Leaf className="w-6 h-6 text-emerald-600 opacity-80" />
          </h1>

          <p className="text-lg opacity-80 mt-1 px-10">
            Guided Movement. Tracked Progress. Real Improvement.
          </p>
        </div>

        <Link
          to="/avatars"
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="text-right">
            <p className="text-base font-semibold text-foreground">
              {userName}
            </p>
            <p className="text-sm text-muted-foreground">
              {userRole}
            </p>
          </div>

          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={avatarSana}
              alt={userName}
              className="w-full h-full object-cover"
            />
          </div>

          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </Link>
      </header>
    </div>
  );
};

export default Header;
