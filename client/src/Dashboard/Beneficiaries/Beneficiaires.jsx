import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Beneficiaires() {
  const [beneficiers, setBeneficiers] = useState([]);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [villeId, setVilleId] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchBeneficiers();
  }, []);

  const fetchBeneficiers = async () => {
    try {
      const response = await axios.get('/api/beneficiers'); // Ajustez le chemin si nécessaire
      setBeneficiers(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des bénéficiaires', error);
    }
  };

  const handleAddBeneficier = async (e) => {
    e.preventDefault();
    try {
      if (selectedId) {
        await axios.put(`/api/beneficiers/${selectedId}`, {
          nom,
          prenom,
          email,
          telephone,
          ville_id: villeId,
        });
      } else {
        await axios.post('/api/beneficiers', {
          nom,
          prenom,
          email,
          telephone,
          ville_id: villeId,
        });
      }
      fetchBeneficiers();
      resetForm();
    } catch (error) {
      console.error('Erreur lors de l\'ajout ou de la mise à jour du bénéficiaire', error);
    }
  };

  const handleEditBeneficier = (beneficier) => {
    setNom(beneficier.nom);
    setPrenom(beneficier.prenom);
    setEmail(beneficier.email);
    setTelephone(beneficier.telephone);
    setVilleId(beneficier.ville_id);
    setSelectedId(beneficier.id);
  };

  const handleDeleteBeneficier = async (id) => {
    try {
      await axios.delete(`/api/beneficiers/${id}`);
      fetchBeneficiers();
    } catch (error) {
      console.error('Erreur lors de la suppression du bénéficiaire', error);
    }
  };

  const resetForm = () => {
    setNom('');
    setPrenom('');
    setEmail('');
    setTelephone('');
    setVilleId('');
    setSelectedId(null);
  };

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-4">Liste des Bénéficiaires</h1>
      <form onSubmit={handleAddBeneficier} className="mb-4">
        <div className="flex flex-col mb-2">
          <label>Nom:</label>
          <input 
            type="text" 
            value={nom} 
            onChange={(e) => setNom(e.target.value)} 
            required 
            className="border p-2"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label>Prénom:</label>
          <input 
            type="text" 
            value={prenom} 
            onChange={(e) => setPrenom(e.target.value)} 
            required 
            className="border p-2"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="border p-2"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label>Téléphone:</label>
          <input 
            type="text" 
            value={telephone} 
            onChange={(e) => setTelephone(e.target.value)} 
            className="border p-2"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label>ID Ville:</label>
          <input 
            type="text" 
            value={villeId} 
            onChange={(e) => setVilleId(e.target.value)} 
            required 
            className="border p-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">{selectedId ? 'Modifier' : 'Ajouter'}</button>
      </form>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nom</th>
            <th className="border px-4 py-2">Prénom</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Téléphone</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {beneficiers.map((beneficier) => (
            <tr key={beneficier.id}>
              <td className="border px-4 py-2">{beneficier.nom}</td>
              <td className="border px-4 py-2">{beneficier.prenom}</td>
              <td className="border px-4 py-2">{beneficier.email}</td>
              <td className="border px-4 py-2">{beneficier.telephone}</td>
              <td className="border px-4 py-2">
                <button 
                  onClick={() => handleEditBeneficier(beneficier)} 
                  className="bg-yellow-500 text-white px-2 py-1 mr-2"
                >
                  Modifier
                </button>
                <button 
                  onClick={() => handleDeleteBeneficier(beneficier.id)} 
                  className="bg-red-500 text-white px-2 py-1"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Beneficiaires;
