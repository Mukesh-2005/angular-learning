import { Component, signal, computed } from '@angular/core';

interface Task {
  id: number;
  text: string;
  done: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  tasks = signal<Task[]>([
    { id: 0, text: 'Complete HTML assignment', done: false },
    { id: 1, text: 'Learn JavaScript', done: true },
    { id: 2, text: 'Build a responsive website', done: false }
  ]);
  nextId = 3;
  search = signal('');
  filter = signal('all');

  filters = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'done', label: 'Completed' }
  ];

  // derived data: recalculated automatically when tasks, search or filter change
  visibleTasks = computed(() => {
    const f = this.filter();
    const s = this.search().toLowerCase();
    return this.tasks()
      .filter(t => (f === 'pending' ? !t.done : f === 'done' ? t.done : true))
      .filter(t => t.text.toLowerCase().includes(s));
  });

  doneCount = computed(() => this.tasks().filter(t => t.done).length);

  addTask(text: string) {
    const trimmed = text.trim();
    if (trimmed === '') return;
    this.tasks.update(list => [...list, { id: this.nextId++, text: trimmed, done: false }]);
  }

  toggleTask(id: number) {
    this.tasks.update(list => list.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  deleteTask(id: number) {
    this.tasks.update(list => list.filter(t => t.id !== id));
  }

  setSearch(event: Event) {
    this.search.set((event.target as HTMLInputElement).value);
  }
}