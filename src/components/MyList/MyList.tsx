import { FaPlus, FaMinus } from 'react-icons/fa';
import { useState, useEffect } from 'react';

type User = {
  myList: number[];
  // outras propriedades do usuário, se houver
};

export default function MyListButton({ id }: { id: number }) {
  const [user, setUser] = useState<User | null>(null);

  // Ao montar, carrega o usuário do localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('animacrono_current_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Verifica se o id está na lista do usuário atualizada
  const isInMyList = user?.myList?.includes(id) ?? false;

  const updateLocalStorage = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('animacrono_current_user', JSON.stringify(newUser));
  };

  const addToMyList = () => {
    if (user) {
      if (!user.myList.includes(id)) {
        const updatedUser = {
          ...user,
          myList: [...user.myList, id],
        };
        updateLocalStorage(updatedUser);
        alert('Filme adicionado à sua lista!');
      } else {
        alert('Filme já está na lista.');
      }
    } else {
      alert('Usuário não autenticado.');
    }
  };

  const removeFromMyList = () => {
    if (user) {
      if (user.myList.includes(id)) {
        const updatedUser = {
          ...user,
          myList: user.myList.filter(itemId => itemId !== id),
        };
        updateLocalStorage(updatedUser);
        alert('Filme removido da sua lista!');
      } else {
        alert('Filme não está na lista.');
      }
    } else {
      alert('Usuário não autenticado.');
    }
  };

  return (
    <>
      {isInMyList ? (
        <button
          className="flex items-center gap-2 bg-gray-700/80 text-white font-bold px-8 py-3 rounded hover:bg-red-600 transition text-lg shadow"
          onClick={removeFromMyList}
        >
          <FaMinus /> Remover da Minha Lista
        </button>
      ) : (
        <button
          className="flex items-center gap-2 bg-gray-700/80 text-white font-bold px-8 py-3 rounded hover:bg-gray-600 transition text-lg shadow"
          onClick={addToMyList}
        >
          <FaPlus /> Minha Lista
        </button>
      )}
    </>
  );
}
