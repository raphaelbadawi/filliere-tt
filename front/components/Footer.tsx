import NewsletterModal from './NewsletterModal';

export default function Footer() {
    return (
        <footer className="mt-4 relative">
            <div className="relative py-4 text-center bg-background z-10">
                <NewsletterModal />
                <address className="text-foreground not-italic">Gymnase du Parmelan, 74570 GROISY</address>
                <p className="text-gray-500">&copy; {new Date().getFullYear()} Fillière TT.</p>
            </div>
            <div className="absolute block inset-0 shadow-reverse"></div>
        </footer>
    );
};
