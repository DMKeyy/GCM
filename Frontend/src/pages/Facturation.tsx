import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Receipt, 
  Plus,
  Download,
  Search,
  Eye,
  Euro,
  Calendar,
  User,
  Filter,
  TrendingUp,
  CreditCard
} from "lucide-react"

const Facturation = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const factures = [
    {
      id: "FAC-2024-001",
      patient: "Marie Dubois",
      date: "2024-01-15",
      montant: 25.00,
      type: "Consultation",
      statut: "payee",
      methodePaiement: "Carte bancaire"
    },
    {
      id: "FAC-2024-002",
      patient: "Jean Martin",
      date: "2024-01-14",
      montant: 35.00,
      type: "Consultation spécialisée",
      statut: "en_attente",
      methodePaiement: "Espèces"
    },
    {
      id: "FAC-2024-003",
      patient: "Sophie Laurent",
      date: "2024-01-12",
      montant: 25.00,
      type: "Consultation",
      statut: "payee",
      methodePaiement: "Chèque"
    },
    {
      id: "FAC-2024-004",
      patient: "Pierre Durand",
      date: "2024-01-10",
      montant: 45.00,
      type: "Consultation + ECG",
      statut: "en_retard",
      methodePaiement: "Virement"
    },
    {
      id: "FAC-2024-005",
      patient: "Emma Rousseau",
      date: "2024-01-08",
      montant: 30.00,
      type: "Consultation de suivi",
      statut: "payee",
      methodePaiement: "Carte bancaire"
    }
  ]

  const statsData = {
    totalMonth: factures.reduce((sum, f) => sum + f.montant, 0),
    paidCount: factures.filter(f => f.statut === 'payee').length,
    pendingCount: factures.filter(f => f.statut === 'en_attente').length,
    overdueCount: factures.filter(f => f.statut === 'en_retard').length
  }

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case 'payee':
        return <Badge className="bg-medical-success text-medical-success-foreground">Payée</Badge>
      case 'en_attente':
        return <Badge variant="secondary">En attente</Badge>
      case 'en_retard':
        return <Badge variant="destructive">En retard</Badge>
      default:
        return <Badge variant="outline">Inconnu</Badge>
    }
  }

  const filteredFactures = factures.filter(facture =>
    facture.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facture.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facture.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Facturation</h1>
          <p className="text-muted-foreground mt-1">
            Gérez vos factures et suivez vos revenus
          </p>
        </div>
        <Button className="shadow-soft">
          <Plus className="h-4 w-4 mr-2" />
          Créer une Facture
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {statsData.totalMonth.toFixed(2)}€
                </p>
                <p className="text-sm text-muted-foreground">Chiffre d'affaires</p>
              </div>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Euro className="h-4 w-4 text-primary-foreground" />
              </div>
            </div>
            <p className="text-xs text-medical-success flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15% ce mois
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">{statsData.paidCount}</p>
                <p className="text-sm text-muted-foreground">Factures payées</p>
              </div>
              <div className="w-8 h-8 bg-medical-success rounded-full flex items-center justify-center">
                <Receipt className="h-4 w-4 text-medical-success-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">{statsData.pendingCount}</p>
                <p className="text-sm text-muted-foreground">En attente</p>
              </div>
              <div className="w-8 h-8 bg-medical-warning rounded-full flex items-center justify-center">
                <Calendar className="h-4 w-4 text-medical-warning-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">{statsData.overdueCount}</p>
                <p className="text-sm text-muted-foreground">En retard</p>
              </div>
              <div className="w-8 h-8 bg-destructive rounded-full flex items-center justify-center">
                <Receipt className="h-4 w-4 text-destructive-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Invoice Form */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Receipt className="h-5 w-5 mr-2 text-primary" />
            Création de Facture
          </CardTitle>
          <CardDescription>
            Créez une nouvelle facture pour une consultation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="invoice-patient">Patient</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="invoice-patient"
                  placeholder="Sélectionner un patient..."
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="invoice-type">Type de consultation</Label>
              <Input
                id="invoice-type"
                placeholder="ex: Consultation générale"
              />
            </div>
            
            <div>
              <Label htmlFor="invoice-amount">Montant</Label>
              <div className="relative">
                <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="invoice-amount"
                  placeholder="25.00"
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3 mt-4">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Créer Facture
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Télécharger PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Invoices List */}
      <Card className="shadow-soft">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Liste des Factures</CardTitle>
              <CardDescription>
                {filteredFactures.length} facture(s) trouvée(s)
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredFactures.map((facture) => (
              <div key={facture.id} className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <Receipt className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{facture.id}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {facture.patient}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(facture.date).toLocaleDateString('fr-FR')}
                        </span>
                        <span className="flex items-center">
                          <CreditCard className="h-3 w-3 mr-1" />
                          {facture.methodePaiement}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{facture.type}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-xl font-bold text-foreground">{facture.montant.toFixed(2)}€</p>
                      {getStatusBadge(facture.statut)}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" title="Voir la facture">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Télécharger PDF">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Facturation