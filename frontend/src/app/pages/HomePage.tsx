import { GlassCard } from "@/components/common/GlassCard";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function HomePage() {
  return (
    <div className="space-y-12">
      <GlassCard className="flex flex-col gap-4 px-4 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Notes</h1>
          <Button>
            <Plus /> Creat Note
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="search notes" className="pl-8" />
        </div>
        <div className="flex flex-col gap-4">
          <GlassCard className="p-4">My Notes</GlassCard>
          <GlassCard className="p-4">My Notes</GlassCard>
          <GlassCard className="p-4">My Notes</GlassCard>
        </div>
      </GlassCard>
    </div>
  );
}
