from collections import deque
import sys
 
input = sys.stdin.readline  # fast input
inf = float('inf')
 
 
def bfs_monsters(monsters, dp, s):
    visited = [[0 for i in range(m)] for j in range(n)]
    lvl = 0
    q = deque(monsters)
    while len(q):
        lvl += 1
        t = len(q)
        for i in range(t):
            a, b = q.popleft()
            if dp[a][b] > lvl:
                dp[a][b] = lvl
                if (a - 1 >= 0 and not visited[a - 1][b] and s[a - 1][b] != '#'): q.append([a - 1, b])
                if (b - 1 >= 0 and not visited[a][b - 1] and s[a][b - 1] != '#'): q.append([a, b - 1])
                if (a + 1 < n and not visited[a + 1][b] and s[a + 1][b] != '#'): q.append([a + 1, b])
                if (b + 1 < m and not visited[a][b + 1] and s[a][b + 1] != '#'): q.append([a, b + 1])
                visited[a][b] = 1
 
 
def bfs_a(x, y, dp, s):
    visited = [[0 for i in range(m)] for j in range(n)]
    lvl = 0
    q = deque()
    q.append([x, y])
    while len(q):
        lvl += 1
        t = len(q)
        for i in range(t):
            a, b = q.popleft()
            if a >= 0 and b >= 0 and a < n and b < m and not visited[a][b] and dp[a][b] > lvl and s[a][b] != '#':
                dp[a][b] = min(dp[a][b], lvl);
                q.append([a - 1, b])
                q.append([a, b - 1])
                q.append([a + 1, b])
                q.append([a, b + 1])
                visited[a][b] = 1
                if a == 0 or b == 0 or a == n - 1 or b == m - 1:
                    return 1
    return 0
 
 
for _ in range(1):
    n, m = map(int, input().split())
    s = [input() for i in range(n)]
    dp = [[inf for i in range(m)] for j in range(n)]
    monsters = []
    for i in range(n):
        for j in range(m):
            if s[i][j] == 'M':
                monsters.append([i, j])
            elif s[i][j] == 'A':
                a, b = i, j
    bfs_monsters(monsters, dp, s)
    if (bfs_a(a, b, dp, s)):
        print("YES")
    else:
        print("NO")