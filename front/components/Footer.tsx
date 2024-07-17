import { FaFacebook, FaInstagram } from 'react-icons/fa6';
import NewsletterModal from './NewsletterModal';

export default function Footer() {
    return (
        <footer className="w-full mt-4 fixed bottom-0">
            <div className="relative py-4 text-center bg-background z-10">
                <NewsletterModal />
                <address className="text-foreground not-italic">{process.env.NEXT_PUBLIC_ADDRESS}</address>
                <div className="flex justify-center space-x-2">
                    <a href={process.env.NEXT_PUBLIC_FACEBOOK} target="_blank" className="text-foreground dark:text-gray-100 hover:text-gray-300 dark:hover:text-gray-500">
                        <FaFacebook className="h-6 w-6 rounded-full p-1 bg-white dark:bg-gray-700 shadow-lg" />
                    </a>
                    <a href={process.env.NEXT_PUBLIC_INSTAGRAM} target="_blank" className="text-foreground dark:text-gray-100 hover:text-gray-300 dark:hover:text-gray-500">
                        <FaInstagram className="h-6 w-6 rounded-full p-1 bg-white dark:bg-gray-700 shadow-lg" />
                    </a>
                </div>
                <p className="text-gray-500">&copy; {new Date().getFullYear()} Fillière TT.</p>
            </div>
            <div className="absolute block inset-0 shadow-reverse"></div>
        </footer>
    );
};
