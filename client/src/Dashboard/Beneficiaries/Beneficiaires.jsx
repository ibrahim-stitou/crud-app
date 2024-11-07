import React, { useEffect, useState } from 'react';
import Axios from '../../api';
import './Beneficiaires.css';
import { useNavigate } from 'react-router';
import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { GrInfo } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import { IoPersonAdd } from "react-icons/io5";

function Beneficiaires() {
  const [beneficiers, setBeneficiers] = useState([]);
  const [villes, setVilles] = useState([]);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [villeId, setVilleId] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteBeneficierId, setDeleteBeneficierId] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [villeAdd,setVilleAdd]=useState()

  const navigate=useNavigate()
  
  useEffect(() => {
    fetchBeneficiers();
    fetchVilles();
  }, []);

  const villeParId = (id) => {
    const ville = villes.find((item) => item.id === parseInt(id));
    return ville ? ville.nom_ville : '';  // Affiche rien si la ville n'est pas trouvée
  };
  
  const fetchBeneficiers = async () => {
    try {
      const response = await Axios.get('/beneficiaires');
      setBeneficiers(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des bénéficiaires', error);
    }
  };

  const fetchVilles = async () => {
    try {
      const response = await Axios.get('/villes');
      setVilles(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des villes', error);
    }
  };

  const handleAddBeneficier = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (selectedId) {
        await Axios.put(`/beneficiaires/${selectedId}`, {
          nom,
          prenom,
          email,
          telephone,
          ville_id: villeId,
        });
        setConfirmationMessage('Bénéficiaire modifié avec succès!');
      } else {
        await Axios.post('/beneficiaires', {
          nom,
          prenom,
          email,
          telephone,
          ville_id: villeAdd,
        });
        setConfirmationMessage('Bénéficiaire ajouté avec succès!');
      }
      fetchBeneficiers();
      resetForm();
      setIsModalOpen(false);
      setShowConfirmation(true);

      setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);
    } catch (error) {
      console.error('Erreur lors de l\'ajout ou de la mise à jour du bénéficiaire', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditBeneficier = (beneficier) => {
    setNom(beneficier.nom);
    setPrenom(beneficier.prenom);
    setEmail(beneficier.email);
    setTelephone(beneficier.telephone);
    setVilleId(beneficier.ville_id);
    setSelectedId(beneficier.id);
    setIsModalOpen(true);
  };

  const handleDeleteBeneficier = async () => {
    try {
      await Axios.delete(`/beneficiaires/${deleteBeneficierId}`);
      setDeleteMessage('Bénéficiaire supprimé avec succès!');
      fetchBeneficiers();
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error('Erreur lors de la suppression du bénéficiaire', error);
      setShowDeleteConfirmation(false);
    } finally {
      setShowDeleteConfirmation(false);
    }
  };

  const confirmDeleteBeneficier = (id) => {
    setDeleteBeneficierId(id);
    setShowDeleteConfirmation(true);
  };

  const cancelDeleteBeneficier = () => {
    setShowDeleteConfirmation(false);
    setDeleteBeneficierId(null);
  };

  const resetForm = () => {
    setNom('');
    setPrenom('');
    setEmail('');
    setTelephone('');
    setVilleId('');
    setSelectedId(null);
  };
const filteredBeneficiers = beneficiers
.filter((beneficier) => {
  return (
    (beneficier.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
    beneficier.prenom.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!villeId || beneficier.ville_id === parseInt(villeId))
  );
})
.sort((a, b) => {
  const field = 'nom'; // You can change this to other fields (e.g., 'prenom', 'email', etc.)
  const isAsc = sortOrder === 'asc';
  if (a[field] < b[field]) return isAsc ? -1 : 1;
  if (a[field] > b[field]) return isAsc ? 1 : -1;
  return 0;
});


  return (
    <div className="container mt-5">
      <h1 className="text-2xl font-bold mb-4">Liste des Bénéficiaires</h1>
<div className='sub-header-container'><button
        onClick={() => { 
          resetForm(); 
          setIsModalOpen(true); 
        }} 
        className="bg-green-500 text-white p-2 mb-4"
      ><IoPersonAdd style={{marginRight:"5px"}}/> Ajouter Bénéficiaire
      </button>

      <div className="filter-section mb-4">
  <input
    type="text"
    placeholder="Rechercher "
    className="search-input"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <select
    value={villeId}
    onChange={(e) => setVilleId(e.target.value)}
    className="city-select"
  >
    <option value="">All</option>
    {villes.map((ville) => (
      <option key={ville.id} value={ville.id}>
        {ville.nom_ville}
      </option>
    ))}
  </select>

  {/* Sorting Radio Buttons */}
  <div className="sort-buttons">
    <label>
      <input
        type="radio"
        className="sortOrder"
        value="asc"
        checked={sortOrder === 'asc'}
        onChange={() => setSortOrder('asc')}
      />
      Asc
    </label>
    <label>
      <input
        type="radio"
        className="sortOrder"
        value="desc"
        checked={sortOrder === 'desc'}
        onChange={() => setSortOrder('desc')}
      />
      Desc
    </label>
  </div>
</div></div>
      

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="text-xl font-semibold mb-4">{selectedId ? 'Modifier' : 'Ajouter'} Bénéficiaire</h2>
            <form onSubmit={handleAddBeneficier}>
              <div className="form-group">
                <label>Nom:</label>
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Prénom:</label>
                <input
                  type="text"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Téléphone:</label>
                <input
                  type="text"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Ville:</label>
                <select
                  value={villeAdd}
                  onChange={(e) => setVilleAdd(e.target.value)}
                  required
                >
                  <option value="">Sélectionner une ville</option>
                  {villes.map((ville) => (
                    <option key={ville.id} value={ville.id}>
                      {ville.nom_ville}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="modal-cancel-button"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="modal-confirm-button"
                  disabled={loading}
                >
                  {loading ? "En cours..." : selectedId ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="confirmation-popup">
          {confirmationMessage}
        </div>
      )}

      {showDeleteConfirmation && (
        <div className="confirmation-popup delete-popup">
          <p>Êtes-vous sûr de vouloir supprimer ce bénéficiaire ?</p>
          <button onClick={handleDeleteBeneficier}>Oui</button>
          <button onClick={cancelDeleteBeneficier}>Non</button>
        </div>
      )}

      {deleteMessage && (
        <div className="confirmation-popup" style={{ backgroundColor: 'red', color: 'white' }}>
          {deleteMessage}
        </div>
      )}

      {filteredBeneficiers.length === 0 ? (
        <div className="no-data-message">
          <img
            src={require("../../assets/rb_2150584271.png")}
            alt="No Data"
            className="no-data-image"
          />
          <p>Aucun bénéficiaire trouvé</p>
        </div>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Nom</th>
              <th className="border px-4 py-2">Prénom</th>
              <th className="border px-4 py-2">Ville</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Téléphone</th>
              <th className="border px-4 py-2" style={{textAlign:'center'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBeneficiers.map((beneficier) => (
              <tr key={beneficier.id}>
                <td className="border px-4 py-2 ">{beneficier.nom}</td>
                <td className="border px-4 py-2">{beneficier.prenom}</td>
                <td className="border px-4 py-2">{villeParId(beneficier.ville_id)}</td>
                <td className="border px-4 py-2">{beneficier.email}</td>
                <td className="border px-4 py-2">{beneficier.telephone}</td>
                <td className="border px-4 py-2" style={{textAlign:'center'}}>
                  <button
                    onClick={() => handleEditBeneficier(beneficier)}
                    className="bg-yellow-500 text-white px-2 py-1 mr-2"
                  ><CiEdit/> 
                    Modifier
                  </button>
                  <button
                    onClick={() => confirmDeleteBeneficier(beneficier.id)}
                    className="bg-red-500 text-white px-2 py-1 mr-2"
                  >
                    <CiTrash/> Supprimer
                  </button>
                  <button className='text-white px-2 py-1 bg-blue-500' onClick={()=>{navigate(`${beneficier.id}`)}}> <GrInfo /> info</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Beneficiaires;
