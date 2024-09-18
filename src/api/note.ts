
import http from '@/lib/http'
import { CreateNoteDto, NoteType } from '@/utils/formType';
import { ResponseStatus } from '@/utils/types';


const noteApi = {
  createNote: async (noteData: CreateNoteDto ) => await http.post<ResponseStatus>('/note', noteData),
  getNoteByDate: async (date: string) => await http.get<NoteType[]>(`/note/${date}`),
  markNoteCompleted: async (noteId: number) => await http.put<NoteType>(`/note/${noteId}`)
}

export default noteApi;