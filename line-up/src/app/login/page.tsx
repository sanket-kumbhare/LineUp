import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:flex items-center justify-center bg-primary px-10 xl:px-16 overflow-hidden">
        <div className="relative text-center max-w-md mx-auto space-y-4 lg:space-y-6">
          <div className="text-5xl lg:text-7xl font-extrabold italic tracking-tight leading-none select-none flex items-baseline justify-center">
            <span className="text-black">Line</span><span className="text-white">Up</span>
          </div>
          <p className="text-white/90 font-medium text-base lg:text-lg">
            Schedule tweets | AI Powered | Maximum impact
          </p>
          <p className="text-white/70 text-xs lg:text-sm pt-2">
            Made with <span className="text-white">❤️</span> by <span className="font-medium">Sanket Kumbhare</span>
          </p>
        </div>
      </div>
    </div>
  )
}
