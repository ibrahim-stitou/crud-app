import React, { useEffect, useState } from 'react';
import Axios from '../../api';
import { useNavigate } from 'react-router-dom'; // Ajoutez l'import de NavLink
import './Activites.css';
import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { GrInfo } from "react-icons/gr";
import { MdLibraryAdd } from "react-icons/md";
function Activites() {
  const [activites, setActivites] = useState([]);
  const [beneficiaires, setBeneficiaires] = useState([]);
  const [villes, setVilles] = useState([]);
  const [titre, setTitre] = useState('');
  const [dateActivite, setDateActivite] = useState('');
  const [villeId, setVilleId] = useState('');
  const [selectedBeneficiaires, setSelectedBeneficiaires] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteActiviteId, setDeleteActiviteId] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  
const navigate=useNavigate()
  useEffect(() => {
    fetchActivites();
    fetchVilles();
    fetchBeneficiaires();
  }, []);

  const fetchActivites = async () => {
    try {
      const response = await Axios.get('/activites');
      setActivites(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des activités', error);
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

  const fetchBeneficiaires = async () => {
    try {
      const response = await Axios.get('/beneficiaires');
      setBeneficiaires(response.data.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des bénéficiaires', error);
    }
  };

  const handleAddActivite = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const payload = {
          id:selectedId,
            titre,
            date_activite: dateActivite,
            ville_id: villeId,
            beneficier_id: selectedBeneficiaires, // Assurez-vous que cela contient un tableau avec les IDs des bénéficiaires
        };
        console.log(payload);
        if (selectedId) {
            // Modification d'une activité existante
            await Axios.put(`/activites/${selectedId}`, payload);
            setConfirmationMessage('Activité modifiée avec succès!');
        } else {
            // Ajout d'une nouvelle activité
            await Axios.post('/activites', payload);
            setConfirmationMessage('Activité ajoutée avec succès!');
        }

        fetchActivites();  // Récupérer à nouveau la liste des activités
        resetForm();  // Réinitialiser le formulaire
        setIsModalOpen(false);
        setShowConfirmation(true);

        setTimeout(() => {
            setShowConfirmation(false);
        }, 3000);
    } catch (error) {
        console.error('Erreur lors de l\'ajout ou de la mise à jour de l\'activité', error);
    } finally {
        setLoading(false);
    }
};



  const handleEditActivite = (activite) => {
    setTitre(activite.titre);
    setDateActivite(activite.date_activite);
    setVilleId(activite.ville_id);
    setSelectedBeneficiaires(activite.beneficers ? activite.beneficers.map(b => b.id) : []);
    setSelectedId(activite.id);
    setIsModalOpen(true);
};


  const handleDeleteActivite = async () => {
    try {
      await Axios.delete(`/activites/${deleteActiviteId}`);
      setDeleteMessage('Activité supprimée avec succès!');
      fetchActivites();
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'activité', error);
      setShowDeleteConfirmation(false);
    }
  };

  const confirmDeleteActivite = (id) => {
    setDeleteActiviteId(id);
    setShowDeleteConfirmation(true);
  };

  const cancelDeleteActivite = () => {
    setShowDeleteConfirmation(false);
    setDeleteActiviteId(null);
  };

  const resetForm = () => {
    setTitre('');
    setDateActivite('');
    setVilleId('');
    setSelectedBeneficiaires([]);
    setSelectedId(null);
  };

  const filteredActivites = activites
    .filter((activite) => {
      return (
        activite.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activite.date_activite.includes(searchTerm) 
      );
    })
    .sort((a, b) => {
      const field = 'titre'; // You can change this to other fields (e.g., 'description', etc.)
      const isAsc = sortOrder === 'asc';
      if (a[field] < b[field]) return isAsc ? -1 : 1;
      if (a[field] > b[field]) return isAsc ? 1 : -1;
      return 0;
    });

  return (
    <div className="container mt-5">
      <h1 className="text-2xl font-bold mb-4">Liste des Activités</h1>

      <div className="sub-header-container">
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="bg-green-500 text-white p-2 mb-4"
        ><MdLibraryAdd style={{marginRight:'10px'}}/> Ajouter Activité
        </button>

        <div className="filter-section mb-4">
          <input
            type="text"
            placeholder="Rechercher"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="text-xl font-semibold mb-4">
              {selectedId ? 'Modifier' : 'Ajouter'} Activité
            </h2>
            <form onSubmit={handleAddActivite}>
              <div className="form-group">
                <label>Titre:</label>
                <input
                  type="text"
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Date de l'activité:</label>
                <input
                  type="date"
                  value={dateActivite}
                  onChange={(e) => setDateActivite(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Ville:</label>
                <select
                  value={villeId}
                  onChange={(e) => setVilleId(e.target.value)}
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
              <div className="form-group">
                <label>Bénéficiaires:</label>
                <select
                  multiple
                  value={selectedBeneficiaires}
                  onChange={(e) => {
                    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value); // Récupérer tous les IDs sélectionnés
                    setSelectedBeneficiaires(selectedOptions); // Mettre à jour l'état avec les IDs sélectionnés
                  }}
                  required
                >
                  {beneficiaires.map((beneficiaire) => (
                    <option key={beneficiaire.id} value={parseInt(beneficiaire.id)}>
                      {beneficiaire.nom}
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
                  {loading ? 'En cours...' : selectedId ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="confirmation-popup">{confirmationMessage}</div>
      )}

      {showDeleteConfirmation && (
        <div className="confirmation-popup delete-popup">
          <p>Êtes-vous sûr de vouloir supprimer cette activité ?</p>
          <button onClick={handleDeleteActivite}>Oui</button>
          <button onClick={cancelDeleteActivite}>Non</button>
        </div>
      )}
      {activites.length === 0 ? (
        <div className="no-data-message">
          <img
            src={require("../../assets/rb_2150584271.png")}
            alt="No Data"
            className="no-data-image"
          />
          <p>Aucune activité trouvée</p>
        </div>
      ) :(
      <table className="table table-bordered">
        <thead>
          <tr>
            <th >Titre</th>
            <th>Date</th>
            <th>Ville</th>
            <th style={{textAlign:"center"}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredActivites.map((activite) => (
            <tr key={activite.id}>
              <td>{activite.titre}</td>
              <td>{activite.date_activite}</td>
              <td>{villes.find((ville) => ville.id === activite.ville_id)?.nom_ville}</td>
              <td  style={{textAlign:"center"}}>
                <button onClick={() => handleEditActivite(activite)} className="bg-yellow-500 text-white px-2 py-1 mr-2" > <CiEdit /> Modifier</button>
                <button onClick={() => confirmDeleteActivite(activite.id)} className="bg-red-500 text-white px-2 py-1 mr-2  "> <CiTrash /> Supprimer</button>
                <button className='text-white px-2 py-1 bg-blue-500' onClick={()=>{navigate(`${activite.id}`)}}> <GrInfo /> vinfo</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>)}
    </div>
  );
}

export default Activites;
