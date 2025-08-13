"use client"

import React, { useState, useEffect, type HtmlHTMLAttributes } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Search, BookOpen, Edit, Trash2, Calendar, User, Hash, Tag, Star } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Badge } from "../components/ui/badge"
import { Alert, AlertDescription } from "../components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"

import { FloatingParticle } from "../components/ui/FloatingParticle"
import { GlowingOrb } from "../components/ui/GlowingOrb"
import { StarRating } from "../components/ui/StarRating"

interface Book {
  id: string
  title: string
  author: string
  isbn: string
  publicationDate: string
  genre: string
  dateAdded: Date
  rating?: number
}

const genres = [
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Fantasy",
  "Biography",
  "History",
  "Horror",
  "Thriller",
  "Poetry",
  "Drama",
]

export default function BookManagementSystem() {
  const [books, setBooks] = useState<Book[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [genreFilter, setGenreFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [notification, setNotification] = useState<string | null>(null)

  const [formData, setFormData] = useState<{
    title: string
    author: string
    isbn: string
    publicationDate: string
    genre: string
    rating: number
  }>({
    title: "",
    author: "",
    isbn: "",
    publicationDate: "",
    genre: "Fiction",
    rating: 5,
  })

  // Sample data (runs once)
  useEffect(() => {
    const sampleBooks: Book[] = [
      {
        id: "1",
        title: "The Murders in the Rue Morgue",
        author: "Edgar Allan Poe",
        isbn: "978-0486266879",
        publicationDate: "1841-04-01",
        genre: "Mystery",
        dateAdded: new Date(),
        rating: 4,
      },
      {
        id: "2",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        isbn: "978-0061120084",
        publicationDate: "1960-07-11",
        genre: "Fiction",
        dateAdded: new Date(),
        rating: 5,
      },
      {
        id: "3",
        title: "1984",
        author: "George Orwell",
        isbn: "978-0451524935",
        publicationDate: "1949-06-08",
        genre: "Science Fiction",
        dateAdded: new Date(),
        rating: 5,
      },
    ]

    setBooks(sampleBooks)
  }, [])

  const showNotification = (message: string) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 3000)
  }

  const handleAddBook = () => {
    if (!formData.title || !formData.author || !formData.isbn || !formData.genre) {
      showNotification("Please fill in all required fields")
      return
    }

    const newBook: Book = {
      id: Date.now().toString(),
      title: formData.title,
      author: formData.author,
      isbn: formData.isbn,
      publicationDate: formData.publicationDate,
      genre: formData.genre,
      dateAdded: new Date(),
      rating: formData.rating,
    }

    setBooks((prev) => [newBook, ...prev])
    setFormData({ title: "", author: "", isbn: "", publicationDate: "", genre: "Fiction", rating: 5 })
    setIsAddDialogOpen(false)
    showNotification(`"${newBook.title}" added successfully`)
  }

  const handleEditBook = () => {
    if (!editingBook || !formData.title || !formData.author || !formData.isbn || !formData.genre) {
      showNotification("Please fill in all required fields")
      return
    }

    setBooks((prev) => prev.map((book) => (book.id === editingBook.id ? { ...book, ...formData } : book)))

    setIsEditDialogOpen(false)
    setEditingBook(null)
    setFormData({ title: "", author: "", isbn: "", publicationDate: "", genre: "Fiction", rating: 5 })
    showNotification(`"${formData.title}" updated successfully`)
  }

  const handleDeleteBook = (id: string) => {
    const bookToDelete = books.find((book) => book.id === id)
    setBooks((prev) => prev.filter((book) => book.id !== id))
    showNotification(`"${bookToDelete?.title}" removed`)
  }

  const openEditDialog = (book: Book) => {
    setEditingBook(book)
    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      publicationDate: book.publicationDate,
      genre: book.genre,
      rating: book.rating || 5,
    })
    setIsEditDialogOpen(true)
  }

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = !genreFilter || genreFilter === "all" || book.genre === genreFilter
    return matchesSearch && matchesGenre
  })

  const resetForm = () => {
    setFormData({ title: "", author: "", isbn: "", publicationDate: "", genre: "Fiction", rating: 5 })
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 relative overflow-hidden">
      {/* Floating Particles */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.2} />
        ))}
      </div>

      {/* Glowing Orbs */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <GlowingOrb size="w-64 h-64" color="from-pink-400 to-purple-600" delay={0} />
        <GlowingOrb size="w-48 h-48" color="from-blue-400 to-cyan-400" delay={2} />
        <GlowingOrb size="w-32 h-32" color="from-yellow-400 to-orange-500" delay={4} />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-8 relative z-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="border-b border-gray-800 pb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="h-8 w-8 text-blue-400" />
            <h1 className="text-3xl font-bold text-white">Book Management</h1>
          </div>
          <p className="text-gray-400">Organize and manage your book collection</p>
        </motion.div>

        {/* Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-4 right-4 z-50"
            >
              <Alert className="bg-gray-800 border-gray-700 text-gray-100">
                <AlertDescription>{notification}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Book and Search Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add Book */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Plus className="h-5 w-5" />
                  Add Book
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={resetForm}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Book
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 border-gray-800 text-gray-100">
                    <DialogHeader>
                      <DialogTitle className="text-white">Add New Book</DialogTitle>
                      <DialogDescription className="text-gray-400">Fill in the details to add a new book to your collection.</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-gray-300">Title *</Label>
                        <Input id="title" value={formData.title} onChange={(e:any) => setFormData((prev) => ({ ...prev, title: e.target.value }))} placeholder="Enter book title" className="bg-gray-800 border-gray-700 text-white placeholder-gray-500" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="author" className="text-gray-300">Author *</Label>
                        <Input id="author" value={formData.author} onChange={(e:any) => setFormData((prev) => ({ ...prev, author: e.target.value }))} placeholder="Enter author name" className="bg-gray-800 border-gray-700 text-white placeholder-gray-500" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="isbn" className="text-gray-300">ISBN *</Label>
                        <Input id="isbn" value={formData.isbn} onChange={(e:any) => setFormData((prev) => ({ ...prev, isbn: e.target.value }))} placeholder="Enter ISBN" className="bg-gray-800 border-gray-700 text-white placeholder-gray-500" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="publicationDate" className="text-gray-300">Publication Date</Label>
                        <Input id="publicationDate" type="date" value={formData.publicationDate} onChange={(e:any) => setFormData((prev) => ({ ...prev, publicationDate: e.target.value }))} className="bg-gray-800 border-gray-700 text-white" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="genre" className="text-gray-300">Genre *</Label>
                        <Select value={formData.genre} onValueChange={(value:any) => setFormData((prev) => ({ ...prev, genre: value }))}>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Select a genre" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            {genres.map((g) => (
                              <SelectItem key={g} value={g} className="text-white hover:bg-gray-700">{g}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-300">Rating</Label>
                        <StarRating rating={formData.rating} onRatingChange={(rating:any) => setFormData((prev) => ({ ...prev, rating }))} interactive />
                      </div>

                      <Button onClick={handleAddBook} className="w-full bg-blue-600 hover:bg-blue-700">Add Book</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </motion.div>

          {/* Search */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white"><Search className="h-5 w-5" />Search & Filter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="search" className="text-gray-300">Search Books</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input id="search" className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500" placeholder="Search by title, author, or genre..." value={searchTerm} onChange={(e:any) => setSearchTerm(e.target.value)} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="genreFilter" className="text-gray-300">Filter by Genre</Label>
                    <div className="flex gap-2">
                      <Select value={genreFilter} onValueChange={setGenreFilter}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="All genres" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="all" className="text-white hover:bg-gray-700">All genres</SelectItem>
                          {genres.map((g) => (
                            <SelectItem key={g} value={g} className="text-white hover:bg-gray-700">{g}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {genreFilter && genreFilter !== "all" && (
                        <Button variant="outline" onClick={() => setGenreFilter("all")} className="shrink-0 border-gray-700 text-gray-300 hover:bg-gray-800">Clear</Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Books List */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-white"><BookOpen className="h-5 w-5" />Book Collection</span>
                <Badge variant="secondary" className="bg-gray-800 text-gray-300">{filteredBooks.length} {filteredBooks.length === 1 ? "book" : "books"}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AnimatePresence>
                {filteredBooks.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-12">
                    <BookOpen className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-400 mb-2">No books found</h3>
                    <p className="text-gray-500">{searchTerm || genreFilter !== "all" ? "Try adjusting your search or filter criteria" : "Add your first book to get started"}</p>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {filteredBooks.map((book, index) => (
                      <motion.div key={book.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ delay: index * 0.05 }} whileHover={{ scale: 1.01 }} className="group">
                        <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="space-y-3 flex-1">
                                <div>
                                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">{book.title}</h3>
                                  <div className="flex items-center gap-2 text-gray-400 mt-1"><User className="h-4 w-4" /><span>{book.author}</span></div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                                  <div className="flex items-center gap-2 text-gray-400"><Hash className="h-4 w-4" /><span>ISBN: {book.isbn}</span></div>
                                  {book.publicationDate && (
                                    <div className="flex items-center gap-2 text-gray-400"><Calendar className="h-4 w-4" /><span>Published: {new Date(book.publicationDate).getFullYear()}</span></div>
                                  )}
                                  <div className="flex items-center gap-2"><Tag className="h-4 w-4 text-gray-400" /><Badge variant="outline" className="border-gray-600 text-gray-300">{book.genre}</Badge></div>
                                  {book.rating && (
                                    <div className="flex items-center gap-2"><Star className="h-4 w-4 text-gray-400" /><StarRating rating={book.rating} /></div>
                                  )}
                                </div>
                              </div>

                              <div className="flex gap-2 shrink-0">
                                <Button variant="outline" size="sm" onClick={() => openEditDialog(book)} className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"><Edit className="h-4 w-4" /></Button>
                                <Button variant="outline" size="sm" onClick={() => handleDeleteBook(book.id)} className="border-gray-600 text-gray-300 hover:bg-red-900 hover:border-red-700 hover:text-red-300"><Trash2 className="h-4 w-4" /></Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-gray-900 border-gray-800 text-gray-100">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Book</DialogTitle>
              <DialogDescription className="text-gray-400">Update the book details below.</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title" className="text-gray-300">Title *</Label>
                <Input id="edit-title" value={formData.title} onChange={(e:any) => setFormData((prev) => ({ ...prev, title: e.target.value }))} placeholder="Enter book title" className="bg-gray-800 border-gray-700 text-white placeholder-gray-500" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-author" className="text-gray-300">Author *</Label>
                <Input id="edit-author" value={formData.author} onChange={(e:any) => setFormData((prev) => ({ ...prev, author: e.target.value }))} placeholder="Enter author name" className="bg-gray-800 border-gray-700 text-white placeholder-gray-500" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-isbn" className="text-gray-300">ISBN *</Label>
                <Input id="edit-isbn" value={formData.isbn} onChange={(e:any) => setFormData((prev) => ({ ...prev, isbn: e.target.value }))} placeholder="Enter ISBN" className="bg-gray-800 border-gray-700 text-white placeholder-gray-500" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-publicationDate" className="text-gray-300">Publication Date</Label>
                <Input id="edit-publicationDate" type="date" value={formData.publicationDate} onChange={(e:any) => setFormData((prev) => ({ ...prev, publicationDate: e.target.value }))} className="bg-gray-800 border-gray-700 text-white" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-genre" className="text-gray-300">Genre *</Label>
                <Select value={formData.genre} onValueChange={(value:any) => setFormData((prev) => ({ ...prev, genre: value }))}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white"><SelectValue placeholder="Select a genre" /></SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {genres.map((g) => (
                      <SelectItem key={g} value={g} className="text-white hover:bg-gray-700">{g}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Rating</Label>
                <StarRating rating={formData.rating} onRatingChange={(rating:any) => setFormData((prev) => ({ ...prev, rating }))} interactive />
              </div>

              <Button onClick={handleEditBook} className="w-full bg-blue-600 hover:bg-blue-700">Update Book</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
