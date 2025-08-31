import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { 
  ArrowLeft,
  Plus,
  Edit,
  Calendar,
  Stethoscope,
  User,
  Clock,
  AlertCircle,
  Paperclip,
  Phone,
  Mail
} from "lucide-react"
import { useForm } from "react-hook-form"

const DossierDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const form = useForm({
    defaultValues: {
      type: "",
      motif: "",
      diagnostic: "",
      traitement: "",
      notes: ""
    }
  })

  // Simulation des données (à remplacer par un appel API)
  const dossiers = [
    {
      id: 1,
      patient: { 
        nom: "Dubois", 
        prenom: "Marie", 
        age: 45, 
        telephone: "01 23 45 67 89",
        email: "marie.dubois@email.com",
        adresse: "123 Rue de la Paix, 75001 Paris",
        numeroSecu: "2 78 12 75 123 456 78"
      },
      consultations: [
        {
          id: 1,
          date: "2024-01-15",
          type: "Consultation générale",
          motif: "Contrôle hypertension",
          diagnostic: "HTA équilibrée",
          traitement: "Poursuite traitement actuel",
          notes: "Tension stable, bon suivi"
        },
        {
          id: 2,
          date: "2024-01-02",
          type: "Consultation de suivi",
          motif: "Résultats analyses",
          diagnostic: "Glycémie normale",
          traitement: "Adaptation régime",
          notes: "Bons résultats diabète"
        }
      ],
      antecedents: ["Hypertension", "Diabète type 2"],
      allergies: ["Pénicilline"],
      traitements: ["Ramipril 10mg", "Metformine 1000mg"],
      derniereConsultation: "2024-01-15"
    },
    {
      id: 2,
      patient: { 
        nom: "Martin", 
        prenom: "Jean", 
        age: 32, 
        telephone: "01 34 56 78 90",
        email: "jean.martin@email.com",
        adresse: "456 Avenue des Champs, 75008 Paris",
        numeroSecu: "1 85 09 78 234 567 89"
      },
      consultations: [
        {
          id: 3,
          date: "2024-01-10",
          type: "Consultation générale",
          motif: "Toux persistante",
          diagnostic: "Bronchite",
          traitement: "Antibiotiques",
          notes: "Amélioration attendue sous 7 jours"
        }
      ],
      antecedents: ["Asthme"],
      allergies: [],
      traitements: ["Ventoline"],
      derniereConsultation: "2024-01-10"
    }
  ]

  const dossier = dossiers.find(d => d.id === parseInt(id || ""))

  if (!dossier) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Dossier non trouvé</h1>
        <Button onClick={() => navigate("/dossiers")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour aux dossiers
        </Button>
      </div>
    )
  }

  const onSubmit = (data: any) => {
    console.log("Nouvelle consultation:", data)
    // Logique pour ajouter la consultation
    form.reset()
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate("/dossiers")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Dossier de {dossier.patient.prenom} {dossier.patient.nom}
            </h1>
            <p className="text-muted-foreground mt-1">
              Patient #{dossier.id} • Dernière consultation: {new Date(dossier.derniereConsultation).toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="shadow-soft">
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle Consultation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nouvelle Consultation</DialogTitle>
              <DialogDescription>
                {dossier.patient.prenom} {dossier.patient.nom}
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de consultation</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Consultation générale" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="motif"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Motif</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Douleur abdominale" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="diagnostic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Diagnostic</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Diagnostic posé..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="traitement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Traitement</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Traitement prescrit..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Notes additionnelles..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="submit">
                    Enregistrer la Consultation
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations Patient */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Informations Patient</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-medium text-primary-foreground">
                    {dossier.patient.prenom[0]}{dossier.patient.nom[0]}
                  </span>
                </div>
                <h3 className="font-semibold text-lg">
                  {dossier.patient.prenom} {dossier.patient.nom}
                </h3>
                <p className="text-muted-foreground">{dossier.patient.age} ans</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{dossier.patient.telephone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{dossier.patient.email}</span>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-muted-foreground">Adresse:</p>
                  <p>{dossier.patient.adresse}</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-muted-foreground">N° Sécurité Sociale:</p>
                  <p>{dossier.patient.numeroSecu}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informations médicales */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Informations Médicales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium text-muted-foreground mb-2">Antécédents:</p>
                <div className="space-y-1">
                  {dossier.antecedents.length > 0 ? (
                    dossier.antecedents.map((antecedent, index) => (
                      <Badge key={index} variant="secondary" className="mr-1">
                        {antecedent}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Aucun antécédent</p>
                  )}
                </div>
              </div>
              
              <div>
                <p className="font-medium text-muted-foreground mb-2">Allergies:</p>
                <div className="space-y-1">
                  {dossier.allergies.length > 0 ? (
                    dossier.allergies.map((allergie, index) => (
                      <Badge key={index} variant="destructive" className="mr-1">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {allergie}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Aucune allergie connue</p>
                  )}
                </div>
              </div>

              <div>
                <p className="font-medium text-muted-foreground mb-2">Traitements en cours:</p>
                <div className="space-y-1">
                  {dossier.traitements.length > 0 ? (
                    dossier.traitements.map((traitement, index) => (
                      <Badge key={index} variant="outline" className="mr-1">
                        <Stethoscope className="h-3 w-3 mr-1" />
                        {traitement}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Aucun traitement en cours</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Historique des consultations */}
        <div className="lg:col-span-2">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Historique des Consultations</span>
                <Badge variant="outline" className="ml-2">
                  {dossier.consultations.length} consultation(s)
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dossier.consultations
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((consultation) => (
                  <div key={consultation.id} className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{consultation.type}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(consultation.date).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-muted-foreground mb-1">Motif:</p>
                        <p className="mb-3">{consultation.motif}</p>
                        
                        <p className="font-medium text-muted-foreground mb-1">Diagnostic:</p>
                        <p>{consultation.diagnostic}</p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground mb-1">Traitement:</p>
                        <p className="mb-3">{consultation.traitement}</p>
                        
                        <p className="font-medium text-muted-foreground mb-1">Notes:</p>
                        <p>{consultation.notes}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DossierDetail