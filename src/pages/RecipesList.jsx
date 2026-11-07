import { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router';

export default function RecipesList() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const searchRef = useRef(null);

    useEffect(() => {
        fetch("https://dummyjson.com/recipes")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch recipes");
                return res.json();
            })
            .then((data) => {
                setRecipes(data.recipes || []);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (searchRef.current) {
            searchRef.current.focus();
        }
    }, []);

    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("q") || "";

    const handleSearch = (e) => {
        const value = e.target.value;
        if (value) {
            setSearchParams({ q: value }, { replace: true });
        } else {
            setSearchParams({}, { replace: true });
        }
    };

    const filtered = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <input
                ref={searchRef}
                type="text"
                placeholder="חיפוש מתכון (באנגלית)"
                value={search}
                onChange={handleSearch}
            />

            <h2>מתכונים</h2>

            {loading && <p>טוען...</p>}
            {error && <p>{error}</p>}

            {!loading && !error && (
                <>
                    {filtered.length === 0 ? (
                        <p>לא נמצאו מתכונים</p>
                    ) : (
                        <ul>
                            {filtered.map((recipe) => (
                                <li key={recipe.id}>
                                    <Link to={`/recipes/${recipe.id}`}>
                                        {recipe.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
}