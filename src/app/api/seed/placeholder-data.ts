import { ComplexitySupport } from "@/types";

export const placeholderData = {
  User: [
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-000000000001",
      "name": "Alice Johnson",
      "email": "alice@example.com",
      "image": "https://example.com/avatar1.png"
    },
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-000000000002",
      "name": "Bob Smith",
      "email": "bob@example.com",
      "image": "https://example.com/avatar2.png"
    }
  ],
  Snippet: [
    {
      "id": "s1b2c3d4-e5f6-7890-abcd-000000000001",
      "title": "Bubble Sort",
      "description": "Simple bubble sort algorithm in Python.",
      "code": "def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]",
      "language": "Python",
      "languageVersion": "3.10",
      "complexity": 'O(sqrt n)',
      "userId": "a1b2c3d4-e5f6-7890-abcd-000000000001",
      "createdAt": "2025-06-19T00:00:00.000Z"
    },
    {
      "id": "s1b2c3d4-e5f6-7890-abcd-000000000002",
      "title": "Binary Search",
      "description": "Efficient binary search implementation.",
      "code": "def binary_search(arr, x):\n    l, r = 0, len(arr) - 1\n    while l <= r:\n        mid = (l + r) // 2\n        if arr[mid] == x:\n            return mid\n        elif arr[mid] < x:\n            l = mid + 1\n        else:\n            r = mid - 1\n    return -1",
      "language": "Python",
      "languageVersion": "3.10",
      "complexity": 'O(log n)',
      "userId": "a1b2c3d4-e5f6-7890-abcd-000000000002",
      "createdAt": "2025-06-18T00:00:00.000Z"
    }
  ],
  Dependency: [
    {
      "id": "d1b2c3d4-e5f6-7890-abcd-000000000001",
      "name": "typing",
      "snippetId": "s1b2c3d4-e5f6-7890-abcd-000000000002"
    },
    {
      "id": "d1b2c3d4-e5f6-7890-abcd-000000000002",
      "name": "virtualenv",
      "snippetId": "s1b2c3d4-e5f6-7890-abcd-000000000002"
    }
  ],
  Keyword: [
    {
      "id": "k1b2c3d4-e5f6-7890-abcd-000000000001",
      "name": "sort",
      "snippetId": "s1b2c3d4-e5f6-7890-abcd-000000000001"
    },
    {
      "id": "k1b2c3d4-e5f6-7890-abcd-000000000002",
      "name": "search",
      "snippetId": "s1b2c3d4-e5f6-7890-abcd-000000000002"
    }
  ],
  Vote: [
    {
      "id": "v1b2c3d4-e5f6-7890-abcd-000000000001",
      "vote": 1,
      "userId": "a1b2c3d4-e5f6-7890-abcd-000000000002",
      "snippetId": "s1b2c3d4-e5f6-7890-abcd-000000000001"
    },
    {
      "id": "v1b2c3d4-e5f6-7890-abcd-000000000002",
      "vote": -1,
      "userId": "a1b2c3d4-e5f6-7890-abcd-000000000001",
      "snippetId": "s1b2c3d4-e5f6-7890-abcd-000000000002"
    }
  ]
}
