import useSWR from "swr";

// User tipini tanımlıyoruz
interface User {
  id: number;
  name: string;
  email: string;
}

// fetcher fonksiyonu, url parametresi tipini 'string' olarak belirtiyoruz
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  // useSWR'de data tipi 'User[]' olarak belirtiliyor
  const { data, error } = useSWR<User[]>(
    "https://jsonplaceholder.typicode.com/users",
    fetcher
  );

  // Hata durumu
  if (error) return <div>Hata oluştu...</div>;

  // Veri henüz yüklenmemişse
  if (!data) return <div>Yükleniyor...</div>;

  return (
    <div>
      <h1>Kullanıcı Listesi</h1>
      <ul>
        {data.map((user: User) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
