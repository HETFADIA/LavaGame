from queue import Queue
import sys
input = sys.stdin.readline  # fast input
inf = float('inf')
class BitArray:
    """implements bitarray using bytearray"""
    def __init__(self, size):
        self.bytes = bytearray((size >> 3) + 1)
 
    def __getitem__(self, index):
        return (self.bytes[index >> 3] >> (index & 7)) & 1
 
    def __setitem__(self, index, value):
        if value:
            self.bytes[index >> 3] |= 1 << (index & 7)
        else:
            self.bytes[index >> 3] &= ~(1 << (index & 7))
def bfs_monsters(monsters, dp, s):
    visited = [BitArray(m) for j in range(n)]
    lvl = 0
    q=Queue()
    for i in monsters:
        q.put(i)
    while q.qsize():
        lvl += 1
        t = q.qsize()
        for i in range(t):
            a, b = q.get()
            if dp[a][b] > lvl:
                dp[a][b] = lvl
                if (a - 1 >= 0 and not visited[a-1][b] and s[a-1][b] != '#'): q.put([a-1, b])
                if (b - 1 >= 0 and not visited[a][b-1] and s[a][b-1] != '#'): q.put([a, b-1])
                if (a + 1 < n and not visited[a+1][b] and s[a+1][b] != '#'): q.put([a+1, b])
                if (b + 1 < m and not visited[a][b+1] and s[a][b+1] != '#'): q.put([a, b+1])
                visited[a][b]=1
def bfs_a(x,y,dp,s):
    visited = [BitArray(m) for j in range(n)]
    lvl=0
    q=Queue()
    q.put([x,y])
    while q.qsize():
        lvl+=1
        t=q.qsize()
        for i in range(t):
            a, b = q.get()
            if a>=0 and b>=0 and a<n and b<m and not visited[a][b] and dp[a][b]>lvl and s[a][b]!='#':
                dp[a][b] = min(dp[a][b], lvl);
                q.put([a - 1, b])
                q.put([a, b - 1])
                q.put([a + 1, b])
                q.put([a, b + 1])
                visited[a][b]=1
                if a==0 or b==0 or a==n-1 or b==m-1:
                    return 1
    return 0
for _ in range(1):
    n, m = map(int, input().split())
    s = [input().strip() for i in range(n)]
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