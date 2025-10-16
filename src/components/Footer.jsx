import React from 'react';
import { Wallet } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-sky-900 text-white mt-12 py-6">
            <div className="container mx-auto text-center">
                <p className="text-lg font-light mb-2">© 2024 BiyaHele, Inc. | Your Journey to Rest.</p>
                <div className="flex justify-center items-center space-x-4 text-sm mt-2">
                    <span className="font-semibold">Payments Accepted:</span>
                    <Wallet className="w-5 h-5 text-yellow-400" />
                    <span>E-wallets & Major Cards</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
