import { toast } from "sonner";

export default function customToast ( message:string ) {
    toast.custom(() => (
        <div className="bg-gray-900 shadow-[inset_0px_-10px_20px_-10px_black] text-center text-white min-w-25 py-5 px-10 border-2 border-gray-700 rounded-xl hover:border-white active:border-white transition-all duration-300">
            {message}
        </div>
    ));
}