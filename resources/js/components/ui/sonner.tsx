import {
  CircleCheck,
  Info,
  LoaderCircle,
  OctagonX,
  TriangleAlert,
} from "lucide-react"
import { useAppearance } from "@/hooks/use-appearance"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { appearance } = useAppearance()

  return (
    <Sonner
      theme="light"
      className="toaster group"
      icons={{
        success: <CircleCheck className="h-4 w-4" />,
        info: <Info className="h-4 w-4" />,
        warning: <TriangleAlert className="h-4 w-4" />,
        error: <OctagonX className="h-4 w-4" />,
        loading: <LoaderCircle className="h-4 w-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
        toast:
            "group toast bg-white text-slate-900 border-violet-200 shadow-lg",
        success:
            "group-[.toaster]:border-violet-200 group-[.toaster]:bg-white group-[.toaster]:text-violet-700",
        description:
            "group-[.toast]:text-slate-500",
        actionButton:
            "group-[.toast]:bg-violet-600 group-[.toast]:text-white hover:group-[.toast]:bg-violet-700",
        cancelButton:
            "group-[.toast]:bg-violet-100 group-[.toast]:text-violet-700",
    },
      }}
      {...props}
    />
  )
}

export { Toaster }
