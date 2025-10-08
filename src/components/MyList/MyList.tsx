import { FaPlus } from 'react-icons/fa';
import { useState } from 'react';

type User = {
    myList: number[];
    // outras propriedades do usuário, se houver
};

export default function MyList({ id }: { id: number }) {
    const [user, setUser] = useState<User | null>(null);

    const addToMyList = () => {
        // Lógica para adicionar o filme à lista
        const currentUser = JSON.parse(localStorage.getItem('animacrono_current_user') || '{}');
        setUser(currentUser ? currentUser : null);
        if (user && Array.isArray(user.myList) && !user.myList.includes(id)) {
            user.myList.push(id);
            setUser({ ...user }); // Atualiza o estado para refletir a mudança
            console.log(user.myList);
        } else {
            alert('Filme já está na lista ou usuário não autenticado.');
        }
    }

    return (
        <button className="flex items-center gap-2 bg-gray-700/80 text-white font-bold px-8 py-3 rounded hover:bg-gray-600 transition text-lg shadow" onClick={addToMyList}>
            <FaPlus /> Minha Lista
        </button>
    );
}