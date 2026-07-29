import { ShieldAlertIcon } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="glass-card border-red-500/20 bg-red-500/[0.01] rounded-2xl p-8 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0 bg-red-500/10 p-4 rounded-2xl border border-red-500/20">
            <ShieldAlertIcon className="size-8 text-red-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">Rate Limit Reached</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-1">
              You've made too many requests in a short period. Please wait a moment.
            </p>
            <p className="text-zinc-500 text-xs font-medium">
              Try again in a few seconds for the best experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;