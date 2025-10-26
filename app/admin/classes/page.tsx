"use client"

import { useEffect, useState } from "react"
import type React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getSupabaseClient } from "@/lib/supabase/client"

export default function AdminClassesPage() {
  const [classes, setClasses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    instructor_name: "",
    capacity: 20,
    duration_minutes: 60,
    difficulty_level: "intermediate",
  })

  useEffect(() => {
    const fetchClasses = async () => {
      const supabase = getSupabaseClient()
      const { data } = await supabase.from("classes").select("*").order("name")
      setClasses(data || [])
      setLoading(false)
    }
    fetchClasses()
  }, [])

  const handleAddClass = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = getSupabaseClient()

    const { data, error } = await supabase.from("classes").insert([formData]).select()

    if (!error && data) {
      setClasses([...classes, data[0]])
      setFormData({
        name: "",
        description: "",
        instructor_name: "",
        capacity: 20,
        duration_minutes: 60,
        difficulty_level: "intermediate",
      })
      setShowForm(false)
    }
  }

  const handleDeleteClass = async (classId: string) => {
    if (!confirm("Are you sure you want to delete this class?")) return

    const supabase = getSupabaseClient()
    const { error } = await supabase.from("classes").delete().eq("id", classId)

    if (!error) {
      setClasses(classes.filter((c) => c.id !== classId))
    }
  }

  if (loading) {
    return <div className="p-8">Loading classes...</div>
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Classes Management</h1>
        <Button onClick={() => setShowForm(!showForm)}>{showForm ? "Cancel" : "Add Class"}</Button>
      </div>

      {showForm && (
        <Card className="p-6 mb-8">
          <form onSubmit={handleAddClass} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Class Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Instructor</label>
                <input
                  type="text"
                  value={formData.instructor_name}
                  onChange={(e) => setFormData({ ...formData, instructor_name: e.target.value })}
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Capacity</label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: Number.parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  value={formData.duration_minutes}
                  onChange={(e) => setFormData({ ...formData, duration_minutes: Number.parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Difficulty Level</label>
                <select
                  value={formData.difficulty_level}
                  onChange={(e) => setFormData({ ...formData, difficulty_level: e.target.value })}
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
              />
            </div>
            <Button type="submit">Create Class</Button>
          </form>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <Card key={cls.id} className="p-6 hover:shadow-lg transition-all">
            <h3 className="text-lg font-bold mb-2">{cls.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{cls.description}</p>
            <div className="space-y-1 text-sm mb-4">
              <p>
                <span className="text-muted-foreground">Instructor:</span> {cls.instructor_name}
              </p>
              <p>
                <span className="text-muted-foreground">Capacity:</span> {cls.capacity}
              </p>
              <p>
                <span className="text-muted-foreground">Duration:</span> {cls.duration_minutes} min
              </p>
              <p>
                <span className="text-muted-foreground">Level:</span> {cls.difficulty_level}
              </p>
            </div>
            <Button variant="destructive" onClick={() => handleDeleteClass(cls.id)} className="w-full">
              Delete
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
