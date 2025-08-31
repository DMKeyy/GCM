import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar, 
  Plus,
  Clock,
  User,
  Phone,
  ChevronLeft,
  ChevronRight,
  Filter
} from "lucide-react"

const RendezVous = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day')

  const appointments = [
    {
      id: 1,
      time: "09:00",
      duration: 30,
      patient: "Marie Dubois",
      type: "Consultation générale",
      status: "confirmed",
      phone: "01 23 45 67 89",
      notes: "Suivi tension artérielle"
    },
    {
      id: 2,
      time: "10:30",
      duration: 45,
      patient: "Jean Martin",
      type: "Suivi médical",
      status: "confirmed",
      phone: "01 34 56 78 90",
      notes: "Contrôle asthme"
    },
    {
      id: 3,
      time: "14:00",
      duration: 30,
      patient: "Sophie Laurent",
      type: "Consultation",
      status: "pending",
      phone: "01 45 67 89 01",
      notes: "Première consultation"
    },
    {
      id: 4,
      time: "15:30",
      duration: 30,
      patient: "Pierre Durand",
      type: "Contrôle",
      status: "confirmed",
      phone: "01 56 78 90 12",
      notes: "Résultats analyses"
    },
    {
      id: 5,
      time: "16:45",
      duration: 30,
      patient: "Emma Rousseau",
      type: "Consultation",
      status: "confirmed",
      phone: "01 67 89 01 23",
      notes: "Migraines récurrentes"
    }
  ]

  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"
  ]

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1))
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7))
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1))
    }
    setCurrentDate(newDate)
  }

  const getAppointmentForTime = (time: string) => {
    return appointments.find(apt => apt.time === time)
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Rendez-vous</h1>
          <p className="text-muted-foreground mt-1">
            Gérez votre planning et vos rendez-vous
          </p>
        </div>
        <Button className="shadow-soft">
          <Plus className="h-4 w-4 mr-2" />
          Créer un RDV
        </Button>
      </div>

      {/* Calendar Controls */}
      <Card className="shadow-soft">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateDate('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="text-xl font-semibold">
                {currentDate.toLocaleDateString('fr-FR', { 
                  weekday: 'long',
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateDate('next')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex bg-muted rounded-lg p-1">
                {(['day', 'week', 'month'] as const).map((mode) => (
                  <Button
                    key={mode}
                    variant={viewMode === mode ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode(mode)}
                    className="text-xs"
                  >
                    {mode === 'day' ? 'Jour' : mode === 'week' ? 'Semaine' : 'Mois'}
                  </Button>
                ))}
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtres
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {appointments.filter(a => a.status === 'confirmed').length}
                </p>
                <p className="text-sm text-muted-foreground">Confirmés</p>
              </div>
              <div className="w-8 h-8 bg-medical-success rounded-full flex items-center justify-center">
                <Calendar className="h-4 w-4 text-medical-success-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {appointments.filter(a => a.status === 'pending').length}
                </p>
                <p className="text-sm text-muted-foreground">En attente</p>
              </div>
              <div className="w-8 h-8 bg-medical-warning rounded-full flex items-center justify-center">
                <Clock className="h-4 w-4 text-medical-warning-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">5h 30min</p>
                <p className="text-sm text-muted-foreground">Temps total</p>
              </div>
              <Clock className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">85%</p>
                <p className="text-sm text-muted-foreground">Taux remplissage</p>
              </div>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar View */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Time Slots */}
        <Card className="lg:col-span-3 shadow-soft">
          <CardHeader>
            <CardTitle>Planning du Jour</CardTitle>
            <CardDescription>
              Gestion des créneaux et rendez-vous
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {timeSlots.map((time) => {
                const appointment = getAppointmentForTime(time)
                return (
                  <div key={time} className="flex items-center min-h-[60px] border-b border-border/50">
                    <div className="w-20 text-sm font-medium text-muted-foreground">
                      {time}
                    </div>
                    <div className="flex-1 ml-4">
                      {appointment ? (
                        <div className={`p-3 rounded-lg border-l-4 ${
                          appointment.status === 'confirmed' 
                            ? 'bg-medical-light border-l-medical-success' 
                            : 'bg-accent border-l-medical-warning'
                        }`}>
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-foreground">{appointment.patient}</h4>
                              <p className="text-sm text-muted-foreground">{appointment.type}</p>
                              <p className="text-xs text-muted-foreground mt-1">{appointment.notes}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                                {appointment.duration}min
                              </Badge>
                              <Button variant="ghost" size="icon">
                                <Phone className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Button 
                          variant="ghost" 
                          className="w-full h-12 border-2 border-dashed border-border hover:border-primary hover:bg-primary-soft transition-colors"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Créer RDV
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Actions Rapides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau RDV
            </Button>
            <Button variant="outline" className="w-full" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Vue Semaine
            </Button>
            <Button variant="outline" className="w-full" size="sm">
              <Clock className="h-4 w-4 mr-2" />
              Créneaux Libres
            </Button>
            
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-3">Prochains RDV</h4>
              <div className="space-y-2">
                {appointments.slice(0, 3).map((apt) => (
                  <div key={apt.id} className="p-2 bg-accent rounded text-sm">
                    <p className="font-medium">{apt.time} - {apt.patient}</p>
                    <p className="text-muted-foreground text-xs">{apt.type}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default RendezVous