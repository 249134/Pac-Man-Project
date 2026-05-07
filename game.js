// 游戏常量
const TILE_SIZE = 25;
const GRID_WIDTH = 28;
const GRID_HEIGHT = 31;
const BASE_SPEED = 2;
const FRAME_RATE = 60;

// 游戏状态
let gameState = {
    score: 0,
    lives: 3,
    level: 1,
    gameOver: false,
    gameWon: false,
    aiEnabled: true,
    pelletsRemaining: 0,
    totalPellets: 0,
    gameStarted: false,
    gamePaused: false
};


// 地图说明：1=墙，2=豆子，3=超级豆子，4=传送通道
let maze = [
    [1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,2,1,1,1,1,2,1,1,1,1,1,1,1,1,2,1,1,1,1,2,1,1,2,1],
    [1,2,1,1,2,1,1,1,1,2,1,1,1,1,1,1,1,1,2,1,1,1,1,2,1,1,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,2,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,2,1,1,2,1],
    [1,2,1,1,2,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,2,1,1,2,1],
    [1,2,2,2,2,1,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,1,2,2,2,2,1],
    [1,1,1,1,2,1,1,1,1,2,1,1,0,1,1,0,1,1,2,1,1,1,1,2,1,1,1,1],
    [4,0,0,0,2,1,1,1,1,2,1,1,0,1,1,0,1,1,2,1,1,1,1,2,0,0,0,4],
    [1,1,1,1,2,1,2,2,2,2,1,1,0,0,0,0,1,1,2,2,2,2,1,2,1,1,1,1],
    [1,2,2,2,2,2,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,2,2,2,2,2,1],
    [1,2,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,2,1],
    [1,2,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,2,1],
    [1,2,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,2,1],
    [1,2,2,2,2,2,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,2,2,2,2,2,4],
    [1,1,1,1,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,1,1,1,1],
    [4,0,0,0,2,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,2,0,0,0,4],
    [1,1,1,1,2,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,2,1,1,1,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,2,1,1,1,1,2,1,1,2,1,1,2,1,1,2,1,1,1,1,2,1,1,2,1],
    [1,2,1,1,2,1,1,1,1,2,1,1,2,1,1,2,1,1,2,1,1,1,1,2,1,1,2,1],
    [1,3,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,3,1],
    [1,1,1,1,2,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,2,1,1,1,1],
    [1,1,1,1,2,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,2,1,1,1,1],
    [1,2,2,2,2,1,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,1,2,2,2,2,1],
    [1,2,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1]
];
// 初始化豆子
function initializePellets() {
    gameState.totalPellets = 0;
    gameState.pelletsRemaining = 0;
    
    for (let y = 0; y < GRID_HEIGHT; y++) {
        for (let x = 0; x < GRID_WIDTH; x++) {
            // 传送通道(4)也可以放置豆子
            if (maze[y][x] === 0 || maze[y][x] === 4) {
                maze[y][x] = 2; // 普通豆子
                gameState.totalPellets++;
                gameState.pelletsRemaining++;
            } else if (maze[y][x] === 2) {
                gameState.totalPellets++;
                gameState.pelletsRemaining++;
            } else if (maze[y][x] === 3) {
                // 超级豆子也计入总数
                gameState.totalPellets++;
                gameState.pelletsRemaining++;
            }
        }
    }
}

// A*寻路算法节点类
class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.g = 0;
        this.h = 0;
        this.f = 0;
        this.parent = null;
    }
}

// 吃豆人类
class Pacman {
    constructor() {
        this.x = 14 * TILE_SIZE + TILE_SIZE/2;
        this.y = 24 * TILE_SIZE + TILE_SIZE/2;
        this.direction = { x: 0, y: 0 };
        this.nextDirection = { x: 0, y: 0 };
        this.mouthAngle = 0;
        this.mouthSpeed = 0.2;
        this.isPowered = false;
        this.powerTime = 0;
        this.speed = BASE_SPEED;
    }
    
    update() {
        // 检查是否可以改变方向
        const nextX = this.x + this.nextDirection.x * TILE_SIZE;
        const nextY = this.y + this.nextDirection.y * TILE_SIZE;
        const gridX = Math.floor(nextX / TILE_SIZE);
        const gridY = Math.floor(nextY / TILE_SIZE);
        
        // 传送通道(4)也可以通行
        if (maze[gridY] && (maze[gridY][gridX] !== 1)) {
            this.direction = { ...this.nextDirection };
        }
        
        // 移动
        const newX = this.x + this.direction.x * this.speed;
        const newY = this.y + this.direction.y * this.speed;
        
        if (this.canMove(newX, newY)) {
            this.x = newX;
            this.y = newY;
        }
        
        // 检查是否在传送通道中
        this.checkTeleport();
        
        // 地图边界循环
        if (this.x < 0) this.x = GRID_WIDTH * TILE_SIZE;
        if (this.x > GRID_WIDTH * TILE_SIZE) this.x = 0;
        
        // 嘴巴动画
        this.mouthAngle += this.mouthSpeed;
        if (this.mouthAngle > 0.7 || this.mouthAngle < 0) {
            this.mouthSpeed *= -1;
        }
        
        // 超级豆子效果
        if (this.isPowered) {
            this.powerTime--;
            if (this.powerTime <= 0) {
                this.isPowered = false;
            }
        }
        
        // 收集豆子
        this.collectPellets();
    }
    
    // 检查传送逻辑
    checkTeleport() {
        const gridX = Math.floor(this.x / TILE_SIZE);
        const gridY = Math.floor(this.y / TILE_SIZE);
        
        // 如果在传送通道中
        if (maze[gridY][gridX] === 4) {
            // 根据方向判断是否应该传送
            if (this.direction.x === -1 && gridX === 0) {
                // 向左移动到最右边
                this.x = (GRID_WIDTH - 1) * TILE_SIZE + TILE_SIZE/2;
            } else if (this.direction.x === 1 && gridX === GRID_WIDTH - 1) {
                // 向右移动到最左边
                this.x = TILE_SIZE/2;
            }
            // 上下传送
            else if (this.direction.y === -1 && gridY === 0) {
                // 向上移动到底部
                this.y = (GRID_HEIGHT - 1) * TILE_SIZE + TILE_SIZE/2;
            } else if (this.direction.y === 1 && gridY === GRID_HEIGHT - 1) {
                // 向下移动到顶部
                this.y = TILE_SIZE/2;
            }
        }
    }
    
    canMove(x, y) {
        const gridX = Math.floor(x / TILE_SIZE);
        const gridY = Math.floor(y / TILE_SIZE);
        
        if (gridX < 0 || gridX >= GRID_WIDTH || gridY < 0 || gridY >= GRID_HEIGHT) {
            return true;
        }
        
        // 传送通道(4)也可以通行
        return maze[gridY][gridX] !== 1;
    }
    
    collectPellets() {
        const gridX = Math.floor(this.x / TILE_SIZE);
        const gridY = Math.floor(this.y / TILE_SIZE);
        
        if (maze[gridY][gridX] === 2) {
            maze[gridY][gridX] = 4; // 收集后变成传送通道
            gameState.score += 10;
            gameState.pelletsRemaining--;
            
            if (gameState.pelletsRemaining <= 0) {
                gameState.gameWon = true;
            }
        } else if (maze[gridY][gridX] === 3) {
            maze[gridY][gridX] = 4; // 收集后变成传送通道
            gameState.score += 50;
            gameState.pelletsRemaining--;
            this.isPowered = true;
            this.powerTime = 300;
            
            if (gameState.pelletsRemaining <= 0) {
                gameState.gameWon = true;
            }
        }
    }
    
    draw() {
        push();
        translate(this.x, this.y);
        rotate(atan2(this.direction.y, this.direction.x));
        
        fill(255, 255, 0);
        noStroke();
        
        const angle = this.mouthAngle;
        arc(0, 0, TILE_SIZE, TILE_SIZE, angle, TWO_PI - angle, PIE);
        
        fill(0);
        ellipse(TILE_SIZE/6, -TILE_SIZE/6, TILE_SIZE/5, TILE_SIZE/5);
        pop();
    }
}

// 幽灵类
class Ghost {
    constructor(x, y, color, name, speedModifier = 1.0) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.name = name;
        this.behavior = 'chase';
        this.direction = { x: 0, y: 0 };
        this.baseSpeed = BASE_SPEED;
        this.speed = this.baseSpeed * speedModifier;
        this.target = null;
        this.frightenedTime = 0;
        this.lastDirectionChange = 0;
        this.patrolTargets = [];
        this.currentPatrolIndex = 0;
        this.eatenPelletsPercent = 0;
    }
    
    update(pacman, otherGhosts = []) {
        if (!gameState.aiEnabled) return;
        
        this.eatenPelletsPercent = 1 - (gameState.pelletsRemaining / gameState.totalPellets);
        
        this.updateBehavior();
        this.updateSpeed();
        this.setTarget(pacman, otherGhosts);
        
        const path = this.findPath(pacman);
        
        if (path && path.length > 1) {
            const nextNode = path[1];
            this.direction = {
                x: nextNode.x - Math.floor(this.x / TILE_SIZE),
                y: nextNode.y - Math.floor(this.y / TILE_SIZE)
            };
        }
        
        const newX = this.x + this.direction.x * this.speed;
        const newY = this.y + this.direction.y * this.speed;
        
        if (this.canMove(newX, newY)) {
            this.x = newX;
            this.y = newY;
        }
        
        // 检查传送
        this.checkTeleport();
        
        // 边界循环
        if (this.x < 0) this.x = GRID_WIDTH * TILE_SIZE;
        if (this.x > GRID_WIDTH * TILE_SIZE) this.x = 0;
        
        this.checkCollision(pacman);
    }
    
    // 幽灵的传送检查
    checkTeleport() {
        const gridX = Math.floor(this.x / TILE_SIZE);
        const gridY = Math.floor(this.y / TILE_SIZE);
        
        if (maze[gridY][gridX] === 4) {
            if (this.direction.x === -1 && gridX === 0) {
                this.x = (GRID_WIDTH - 1) * TILE_SIZE + TILE_SIZE/2;
            } else if (this.direction.x === 1 && gridX === GRID_WIDTH - 1) {
                this.x = TILE_SIZE/2;
            } else if (this.direction.y === -1 && gridY === 0) {
                this.y = (GRID_HEIGHT - 1) * TILE_SIZE + TILE_SIZE/2;
            } else if (this.direction.y === 1 && gridY === GRID_HEIGHT - 1) {
                this.y = TILE_SIZE/2;
            }
        }
    }
    
    updateBehavior() {
        if (pacman.isPowered) {
            this.behavior = 'frightened';
            this.frightenedTime = pacman.powerTime;
        } else if (this.frightenedTime <= 0) {
            if (this.name === '橙色幽灵' && this.isCloseToPacman(pacman)) {
                this.behavior = 'patrol';
            } else {
                this.behavior = 'chase';
            }
            
            if (random() < 0.005) {
                this.behavior = random() < 0.8 ? 'chase' : 'scatter';
            }
        } else {
            this.frightenedTime--;
        }
    }
    
    updateSpeed() {
        if (this.name === '红色幽灵') {
            const speedMultiplier = 1.0 + (this.eatenPelletsPercent * 0.5);
            this.speed = this.baseSpeed * speedMultiplier;
        } else {
            this.speed = this.baseSpeed;
        }
        
        if (this.behavior === 'frightened') {
            this.speed = this.baseSpeed * 0.7;
        }
    }
    
    setTarget(pacman, otherGhosts = []) {
        const pacmanGridX = Math.floor(pacman.x / TILE_SIZE);
        const pacmanGridY = Math.floor(pacman.y / TILE_SIZE);
        const ghostGridX = Math.floor(this.x / TILE_SIZE);
        const ghostGridY = Math.floor(this.y / TILE_SIZE);
        
        switch(this.name) {
            case '红色幽灵':
                switch(this.behavior) {
                    case 'chase':
                        this.target = { x: pacmanGridX, y: pacmanGridY };
                        break;
                    case 'scatter':
                        this.target = { x: GRID_WIDTH - 3, y: 2 };
                        break;
                    case 'patrol':
                        if (!this.patrolTargets.length) {
                            this.generatePatrolTargets();
                        }
                        this.target = this.patrolTargets[this.currentPatrolIndex];
                        if (dist(ghostGridX, ghostGridY, this.target.x, this.target.y) < 2) {
                            this.currentPatrolIndex = (this.currentPatrolIndex + 1) % this.patrolTargets.length;
                        }
                        break;
                    case 'frightened':
                        this.target = this.getRandomTarget();
                        break;
                }
                break;
                
            case '粉色幽灵':
                switch(this.behavior) {
                    case 'chase':
                        let targetX = pacmanGridX + pacman.direction.x * 4;
                        let targetY = pacmanGridY + pacman.direction.y * 4;
                        
                        if (pacman.direction.x === 0 && pacman.direction.y === 0) {
                            targetX = pacmanGridX;
                            targetY = pacmanGridY;
                        }
                        
                        this.target = { x: targetX, y: targetY };
                        break;
                    case 'scatter':
                        this.target = { x: 2, y: 2 };
                        break;
                    case 'patrol':
                        if (!this.patrolTargets.length) {
                            this.generatePatrolTargets();
                        }
                        this.target = this.patrolTargets[this.currentPatrolIndex];
                        if (dist(ghostGridX, ghostGridY, this.target.x, this.target.y) < 2) {
                            this.currentPatrolIndex = (this.currentPatrolIndex + 1) % this.patrolTargets.length;
                        }
                        break;
                    case 'frightened':
                        this.target = this.getRandomTarget();
                        break;
                }
                break;
                
            case '青色幽灵':
                switch(this.behavior) {
                    case 'chase':
                        const redGhost = otherGhosts.find(g => g.name === '红色幽灵');
                        if (redGhost) {
                            const redX = Math.floor(redGhost.x / TILE_SIZE);
                            const redY = Math.floor(redGhost.y / TILE_SIZE);
                            
                            const vectorX = pacmanGridX - redX;
                            const vectorY = pacmanGridY - redY;
                            
                            this.target = {
                                x: pacmanGridX + vectorX,
                                y: pacmanGridY + vectorY
                            };
                        } else {
                            this.target = { x: pacmanGridX, y: pacmanGridY };
                        }
                        break;
                    case 'scatter':
                        this.target = { x: GRID_WIDTH - 3, y: GRID_HEIGHT - 3 };
                        break;
                    case 'patrol':
                        if (!this.patrolTargets.length) {
                            this.generatePatrolTargets();
                        }
                        this.target = this.patrolTargets[this.currentPatrolIndex];
                        if (dist(ghostGridX, ghostGridY, this.target.x, this.target.y) < 2) {
                            this.currentPatrolIndex = (this.currentPatrolIndex + 1) % this.patrolTargets.length;
                        }
                        break;
                    case 'frightened':
                        this.target = this.getRandomTarget();
                        break;
                }
                break;
                
            case '橙色幽灵':
                switch(this.behavior) {
                    case 'chase':
                        const distanceToPacman = dist(ghostGridX, ghostGridY, pacmanGridX, pacmanGridY);
                        if (distanceToPacman < 5) {
                            if (!this.patrolTargets.length) {
                                this.generatePatrolTargets();
                            }
                            this.target = this.patrolTargets[this.currentPatrolIndex];
                            if (dist(ghostGridX, ghostGridY, this.target.x, this.target.y) < 2) {
                                this.currentPatrolIndex = (this.currentPatrolIndex + 1) % this.patrolTargets.length;
                            }
                        } else {
                            this.target = { x: pacmanGridX, y: pacmanGridY };
                        }
                        break;
                    case 'scatter':
                        this.target = { x: 2, y: GRID_HEIGHT - 3 };
                        break;
                    case 'patrol':
                        if (!this.patrolTargets.length) {
                            this.generatePatrolTargets();
                        }
                        this.target = this.patrolTargets[this.currentPatrolIndex];
                        if (dist(ghostGridX, ghostGridY, this.target.x, this.target.y) < 2) {
                            this.currentPatrolIndex = (this.currentPatrolIndex + 1) % this.patrolTargets.length;
                        }
                        break;
                    case 'frightened':
                        this.target = this.getRandomTarget();
                        break;
                }
                break;
        }
    }
    
    isCloseToPacman(pacman) {
        const pacmanGridX = Math.floor(pacman.x / TILE_SIZE);
        const pacmanGridY = Math.floor(pacman.y / TILE_SIZE);
        const ghostGridX = Math.floor(this.x / TILE_SIZE);
        const ghostGridY = Math.floor(this.y / TILE_SIZE);
        
        const distance = dist(ghostGridX, ghostGridY, pacmanGridX, pacmanGridY);
        return distance < 6;
    }
    
    generatePatrolTargets() {
        this.patrolTargets = [
            { x: 5, y: 5 },
            { x: GRID_WIDTH - 6, y: 5 },
            { x: GRID_WIDTH - 6, y: GRID_HEIGHT - 6 },
            { x: 5, y: GRID_HEIGHT - 6 }
        ];
        this.currentPatrolIndex = 0;
    }
    
    getRandomTarget() {
        let targetX, targetY;
        do {
            targetX = Math.floor(random(2, GRID_WIDTH - 2));
            targetY = Math.floor(random(2, GRID_HEIGHT - 2));
        } while (maze[targetY][targetX] === 1);
        
        return { x: targetX, y: targetY };
    }
    
    findPath(pacman) {
        if (!this.target) return null;
        
        const startNode = new Node(
            Math.floor(this.x / TILE_SIZE),
            Math.floor(this.y / TILE_SIZE)
        );
        
        const openSet = [startNode];
        const closedSet = [];
        
        while (openSet.length > 0) {
            let currentNode = openSet[0];
            let currentIndex = 0;
            
            for (let i = 1; i < openSet.length; i++) {
                if (openSet[i].f < currentNode.f) {
                    currentNode = openSet[i];
                    currentIndex = i;
                }
            }
            
            if (currentNode.x === this.target.x && currentNode.y === this.target.y) {
                const path = [];
                let current = currentNode;
                while (current) {
                    path.push(current);
                    current = current.parent;
                }
                return path.reverse();
            }
            
            openSet.splice(currentIndex, 1);
            closedSet.push(currentNode);
            
            const neighbors = this.getNeighbors(currentNode);
            
            for (const neighbor of neighbors) {
                if (closedSet.some(node => node.x === neighbor.x && node.y === neighbor.y)) {
                    continue;
                }
                
                const tempG = currentNode.g + 1;
                
                const openNode = openSet.find(node => node.x === neighbor.x && node.y === neighbor.y);
                
                if (!openNode || tempG < openNode.g) {
                    neighbor.g = tempG;
                    neighbor.h = this.heuristic(neighbor, this.target);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.parent = currentNode;
                    
                    if (!openNode) {
                        openSet.push(neighbor);
                    }
                }
            }
        }
        
        return null;
    }
    
    getNeighbors(node) {
        const neighbors = [];
        const directions = [
            {x: 0, y: -1},
            {x: 1, y: 0},
            {x: 0, y: 1},
            {x: -1, y: 0}
        ];
        
        for (const dir of directions) {
            const newX = node.x + dir.x;
            const newY = node.y + dir.y;
            
            if (newX >= 0 && newX < GRID_WIDTH && 
                newY >= 0 && newY < GRID_HEIGHT &&
                maze[newY][newX] !== 1) {
                neighbors.push(new Node(newX, newY));
            }
        }
        
        return neighbors;
    }
    
    heuristic(node, target) {
        return Math.abs(node.x - target.x) + Math.abs(node.y - target.y);
    }
    
    canMove(x, y) {
        const gridX = Math.floor(x / TILE_SIZE);
        const gridY = Math.floor(y / TILE_SIZE);
        
        if (gridX < 0 || gridX >= GRID_WIDTH || gridY < 0 || gridY >= GRID_HEIGHT) {
            return true;
        }
        
        return maze[gridY][gridX] !== 1;
    }
    
    checkCollision(pacman) {
        const distance = dist(this.x, this.y, pacman.x, pacman.y);
        
        if (distance < TILE_SIZE * 0.8) {
            if (pacman.isPowered) {
                this.respawn();
                gameState.score += 200;
            } else {
                gameState.lives--;
                pacman.x = 14 * TILE_SIZE + TILE_SIZE/2;
                pacman.y = 24 * TILE_SIZE + TILE_SIZE/2;
                pacman.direction = { x: 0, y: 0 };
                pacman.nextDirection = { x: 0, y: 0 };
                
                for (const ghost of ghosts) {
                    ghost.respawn();
                }
                
                if (gameState.lives <= 0) {
                    gameState.gameOver = true;
                }
            }
        }
    }
    
    respawn() {
        switch(this.name) {
            case '红色幽灵':
                this.x = 14 * TILE_SIZE;
                this.y = 14 * TILE_SIZE;
                break;
            case '粉色幽灵':
                this.x = 13 * TILE_SIZE;
                this.y = 14 * TILE_SIZE;
                break;
            case '青色幽灵':
                this.x = 15 * TILE_SIZE;
                this.y = 14 * TILE_SIZE;
                break;
            case '橙色幽灵':
                this.x = 14 * TILE_SIZE;
                this.y = 15 * TILE_SIZE;
                break;
        }
        this.behavior = 'chase';
        this.frightenedTime = 0;
        this.patrolTargets = [];
        this.currentPatrolIndex = 0;
    }
    
    draw() {
        push();
        translate(this.x, this.y);
        
        if (this.behavior === 'frightened') {
            if (Math.floor(frameCount / 10) % 2 === 0) {
                fill(0, 0, 255);
            } else {
                fill(255, 255, 255);
            }
        } else {
            fill(this.color);
        }
        
        noStroke();
        
        ellipse(0, 0, TILE_SIZE, TILE_SIZE);
        rect(-TILE_SIZE/2, 0, TILE_SIZE, TILE_SIZE/2);
        
        beginShape();
        for (let i = -TILE_SIZE/2; i <= TILE_SIZE/2; i += TILE_SIZE/4) {
            const wave = sin(frameCount * 0.1 + i * 0.5) * 3;
            vertex(i, TILE_SIZE/4 + wave);
        }
        vertex(TILE_SIZE/2, TILE_SIZE/2);
        vertex(-TILE_SIZE/2, TILE_SIZE/2);
        endShape(CLOSE);
        
        fill(255);
        ellipse(-TILE_SIZE/6, -TILE_SIZE/8, TILE_SIZE/4, TILE_SIZE/4);
        ellipse(TILE_SIZE/6, -TILE_SIZE/8, TILE_SIZE/4, TILE_SIZE/4);
        
        fill(0, 0, 255);
        const eyeOffsetX = this.direction.x * 2;
        const eyeOffsetY = this.direction.y * 2;
        ellipse(-TILE_SIZE/6 + eyeOffsetX, -TILE_SIZE/8 + eyeOffsetY, TILE_SIZE/8, TILE_SIZE/8);
        ellipse(TILE_SIZE/6 + eyeOffsetX, -TILE_SIZE/8 + eyeOffsetY, TILE_SIZE/8, TILE_SIZE/8);
        
        pop();
        
        if (debugMode) {
            this.drawPath();
        }
    }
    
    drawPath() {
        const path = this.findPath(pacman);
        if (path) {
            stroke(this.color);
            strokeWeight(2);
            stroke(this.color.levels[0], this.color.levels[1], this.color.levels[2], 150);
            noFill();
            
            beginShape();
            for (const node of path) {
                vertex(
                    node.x * TILE_SIZE + TILE_SIZE/2,
                    node.y * TILE_SIZE + TILE_SIZE/2
                );
            }
            endShape();
            
            fill(this.color);
            noStroke();
            for (const node of path) {
                ellipse(
                    node.x * TILE_SIZE + TILE_SIZE/2,
                    node.y * TILE_SIZE + TILE_SIZE/2,
                    5, 5
                );
            }
        }
    }
}
// 开始游戏函数
function startGame() {
    gameState.gameStarted = true;
    gameState.gamePaused = false;
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('pause-game').innerHTML = '<i class="fas fa-pause"></i><span>暂停游戏</span>';
}
// 切换暂停状态
function togglePause() {
    if (!gameState.gameStarted || gameState.gameOver || gameState.gameWon) return;
    
    gameState.gamePaused = !gameState.gamePaused;
    const pauseBtn = document.getElementById('pause-game');
    if (gameState.gamePaused) {
        pauseBtn.innerHTML = '<i class="fas fa-play"></i><span>继续游戏</span>';
        pauseBtn.style.background = 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)';
    } else {
        pauseBtn.innerHTML = '<i class="fas fa-pause"></i><span>暂停游戏</span>';
        pauseBtn.style.background = 'linear-gradient(135deg, #ffd32a 0%, #ffa801 100%)';
    }
}
// 下一关
function nextLevel() {
    gameState.level++;
    gameState.gameWon = false;
    gameState.score += 1000;
    
    document.getElementById('game-win-screen').style.display = 'none';
    document.getElementById('level').textContent = gameState.level;
    
    restartGame();
}
// 切换调试模式
function toggleDebugMode() {
    debugMode = !debugMode;
    const debugBtn = document.getElementById('debug-toggle');
    if (debugMode) {
        debugBtn.innerHTML = '<i class="fas fa-code"></i><span>调试模式: 开启</span>';
        debugBtn.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)';
    } else {
        debugBtn.innerHTML = '<i class="fas fa-code"></i><span>调试模式: 关闭</span>';
        debugBtn.style.background = 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)';
    }
}
// 显示欢迎界面
function showWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcome-screen');
    if (welcomeScreen) {
        welcomeScreen.style.display = 'flex';
    }
}

// 更新游戏信息显示
function updateGameInfo() {
    const scoreElement = document.getElementById('score');
    const livesElement = document.getElementById('lives');
    const levelElement = document.getElementById('level');
    const progressPercentElement = document.getElementById('progress-percent');
    const pelletsCountElement = document.getElementById('pellets-count');
    const totalPelletsElement = document.getElementById('total-pellets');
    const powerStatusElement = document.getElementById('power-status');
    const aiStatusElement = document.getElementById('ai-status');
    
    if (scoreElement) scoreElement.textContent = gameState.score;
    if (livesElement) livesElement.textContent = gameState.lives;
    if (levelElement) levelElement.textContent = gameState.level;
    
    // 更新进度条
    if (gameState.totalPellets > 0) {
        const progressPercent = Math.round((1 - gameState.pelletsRemaining / gameState.totalPellets) * 100);
        
        if (progressPercentElement) {
            progressPercentElement.textContent = progressPercent + '%';
        }
        
        const progressFillElement = document.getElementById('progress-fill');
        if (progressFillElement) {
            progressFillElement.style.width = progressPercent + '%';
        }
        
        if (pelletsCountElement) {
            pelletsCountElement.textContent = gameState.pelletsRemaining;
        }
        
        if (totalPelletsElement) {
            totalPelletsElement.textContent = gameState.totalPellets;
        }
    }
    
    // 更新超级模式状态
    if (powerStatusElement) {
        if (pacman && pacman.isPowered) {
            powerStatusElement.textContent = '激活中';
            powerStatusElement.style.color = '#4ecdc4';
        } else {
            powerStatusElement.textContent = '未激活';
            powerStatusElement.style.color = '#a8a8a8';
        }
    }
    
    // 更新AI状态
    if (aiStatusElement) {
        if (gameState.aiEnabled) {
            aiStatusElement.textContent = '开启';
            aiStatusElement.style.color = '#4ecdc4';
        } else {
            aiStatusElement.textContent = '关闭';
            aiStatusElement.style.color = '#a8a8a8';
        }
    }
}

// 游戏对象
let pacman;
let ghosts = [];
let debugMode = false;

// 初始化函数
function setup() {
    const canvas = createCanvas(GRID_WIDTH * TILE_SIZE, GRID_HEIGHT * TILE_SIZE);
    canvas.parent('game-container');
    frameRate(FRAME_RATE);
    
    // 初始化
    initializePellets();
    pacman = new Pacman();
    
    ghosts = [
        new Ghost(14 * TILE_SIZE, 14 * TILE_SIZE, color(255, 0, 0), '红色幽灵', 1.0),
        new Ghost(13 * TILE_SIZE, 14 * TILE_SIZE, color(255, 182, 255), '粉色幽灵', 1.0),
        new Ghost(15 * TILE_SIZE, 14 * TILE_SIZE, color(0, 255, 255), '青色幽灵', 1.0),
        new Ghost(14 * TILE_SIZE, 15 * TILE_SIZE, color(255, 182, 85), '橙色幽灵', 1.0)
    ];
    
    // 设置按钮事件 - 安全地绑定，检查元素是否存在
    const pauseGameBtn = document.getElementById('pause-game');
    const restartBtn = document.getElementById('restart');
    const toggleAiBtn = document.getElementById('toggle-ai');
    const debugToggleBtn = document.getElementById('debug-toggle');
    const startGameModalBtn = document.getElementById('start-game-modal');
    const restartGameBtn = document.getElementById('restart-game');
    const restartWinBtn = document.getElementById('restart-win');
    
    // 为存在的按钮添加事件监听器
    if (pauseGameBtn) pauseGameBtn.addEventListener('click', togglePause);
    if (restartBtn) restartBtn.addEventListener('click', restartGame);
    if (toggleAiBtn) toggleAiBtn.addEventListener('click', toggleAI);
    if (debugToggleBtn) debugToggleBtn.addEventListener('click', toggleDebugMode);
    if (startGameModalBtn) startGameModalBtn.addEventListener('click', startGame);
    if (restartGameBtn) restartGameBtn.addEventListener('click', restartGame);
    if (restartWinBtn) restartWinBtn.addEventListener('click', restartGame);
    
    // 键盘控制
    document.addEventListener('keydown', handleKeyPress);
    
    // 初始时显示欢迎界面
    const welcomeScreen = document.getElementById('welcome-screen');
    if (welcomeScreen) {
        welcomeScreen.style.display = 'flex';
    }
    
    updateGameInfo();
}

// 主绘制函数
function draw() {
    background(0);
    drawMaze();
    
    // 只有在游戏已开始且未暂停时才更新游戏对象
    if (gameState.gameStarted && !gameState.gamePaused && !gameState.gameOver && !gameState.gameWon) {
        pacman.update();
        
        for (const ghost of ghosts) {
            ghost.update(pacman, ghosts);
        }
        
        // 更新游戏信息
        updateGameInfo();
    }
    
    // 始终绘制游戏对象
    pacman.draw();
    for (const ghost of ghosts) {
        ghost.draw();
    }
    
    // 显示游戏结束界面
    if (gameState.gameOver) {
        document.getElementById('final-score').textContent = gameState.score;
        document.getElementById('game-over-screen').style.display = 'flex';
    } else if (gameState.gameWon) {
        document.getElementById('win-score').textContent = gameState.score;
        document.getElementById('game-win-screen').style.display = 'flex';
    }
}
// 修改绘制地图函数
function drawMaze() {
    for (let y = 0; y < GRID_HEIGHT; y++) {
        for (let x = 0; x < GRID_WIDTH; x++) {
            const tileX = x * TILE_SIZE;
            const tileY = y * TILE_SIZE;
            
            switch(maze[y][x]) {
                case 1: // 墙
                    fill(0, 0, 139);
                    stroke(0, 0, 255);
                    strokeWeight(2);
                    rect(tileX, tileY, TILE_SIZE, TILE_SIZE);
                    break;
                    
                case 2: // 豆子
                    fill(255, 255, 255);
                    noStroke();
                    ellipse(
                        tileX + TILE_SIZE/2,
                        tileY + TILE_SIZE/2,
                        TILE_SIZE/4,
                        TILE_SIZE/4
                    );
                    break;
                    
                case 3: // 超级豆子
                    fill(255, 255, 0);
                    noStroke();
                    ellipse(
                        tileX + TILE_SIZE/2,
                        tileY + TILE_SIZE/2,
                        TILE_SIZE/2,
                        TILE_SIZE/2
                    );
                    break;
                    
                case 4: // 传送通道 - 用浅蓝色表示
                    fill(100, 100, 255, 100);
                    stroke(150, 150, 255);
                    strokeWeight(1);
                    rect(tileX, tileY, TILE_SIZE, TILE_SIZE);
                    
                    // 绘制传送箭头
                    fill(200, 200, 255);
                    noStroke();
                    // 左箭头
                    triangle(
                        tileX + 5, tileY + TILE_SIZE/2,
                        tileX + TILE_SIZE - 5, tileY + 5,
                        tileX + TILE_SIZE - 5, tileY + TILE_SIZE - 5
                    );
                    // 右箭头
                    triangle(
                        tileX + TILE_SIZE - 5, tileY + TILE_SIZE/2,
                        tileX + 5, tileY + 5,
                        tileX + 5, tileY + TILE_SIZE - 5
                    );
                    break;
            }
        }
    }
}
// 绘制游戏信息
function drawGameInfo() {
    // 更新HTML元素
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('lives').textContent = gameState.lives;
    document.getElementById('level').textContent = gameState.level;
    
    // 更新进度条
    updateProgressBar();
}

// 更新进度条
function updateProgressBar() {
    if (gameState.totalPellets > 0) {
        const progressPercent = Math.round((1 - gameState.pelletsRemaining / gameState.totalPellets) * 100);
        document.getElementById('progress-percent').textContent = progressPercent + '%';
        document.getElementById('progress-fill').style.width = progressPercent + '%';
        document.getElementById('pellets-count').textContent = gameState.pelletsRemaining;
        document.getElementById('total-pellets').textContent = gameState.totalPellets;
    }
}
// 绘制游戏结束界面
function drawGameOver() {
    fill(255, 0, 0, 200);
    rect(0, 0, width, height);
    
    fill(255);
    textSize(32);
    textAlign(CENTER);
    text('游戏结束!', width/2, height/2 - 30);
    textSize(20);
    text(`最终得分: ${gameState.score}`, width/2, height/2 + 20);
    text('点击重新开始按钮重新游戏', width/2, height/2 + 60);
}
// 绘制游戏胜利界面
function drawGameWon() {
    fill(0, 255, 0, 150);
    rect(0, 0, width, height);
    
    fill(255);
    textSize(32);
    textAlign(CENTER);
    text('恭喜通关!', width/2, height/2 - 30);
    textSize(20);
    text(`得分: ${gameState.score}`, width/2, height/2 + 20);
}
// 处理键盘按键
function handleKeyPress(e) {
    // 按Enter键开始游戏
    if (e.key === 'Enter' && !gameState.gameStarted) {
        startGame();
        return;
    }
    
    // 只有在游戏已开始时才响应其他键盘控制
    if (!gameState.gameStarted) return;
    
    // 按空格键暂停/继续
    if (e.key === ' ') {
        togglePause();
        e.preventDefault();
        return;
    }
    
    // 游戏结束时停止响应键盘
    if (gameState.gameOver || gameState.gameWon || gameState.gamePaused) return;
    
    switch(e.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
            pacman.nextDirection = { x: 0, y: -1 };
            e.preventDefault();
            break;
            
        case 'arrowdown':
        case 's':
            pacman.nextDirection = { x: 0, y: 1 };
            e.preventDefault();
            break;
            
        case 'arrowleft':
        case 'a':
            pacman.nextDirection = { x: -1, y: 0 };
            e.preventDefault();
            break;
            
        case 'arrowright':
        case 'd':
            pacman.nextDirection = { x: 1, y: 0 };
            e.preventDefault();
            break;
            
        case 'q': 
            toggleDebugMode();
            e.preventDefault();
            break;
    }
}
// 重启游戏函数
function restartGame() {
    gameState = {
        score: 0,
        lives: 3,
        level: gameState.level, 
        gameOver: false,
        gameWon: false,
        aiEnabled: gameState.aiEnabled,
        pelletsRemaining: 0,
        totalPellets: 0,
        gameStarted: true,
        gamePaused: false
    };
    
    resetMaze();
    initializePellets();
    pacman = new Pacman();
    
    ghosts = [
        new Ghost(14 * TILE_SIZE, 14 * TILE_SIZE, color(255, 0, 0), '红色幽灵', 1.0),
        new Ghost(13 * TILE_SIZE, 14 * TILE_SIZE, color(255, 182, 255), '粉色幽灵', 1.0),
        new Ghost(15 * TILE_SIZE, 14 * TILE_SIZE, color(0, 255, 255), '青色幽灵', 1.0),
        new Ghost(14 * TILE_SIZE, 15 * TILE_SIZE, color(255, 182, 85), '橙色幽灵', 1.0)
    ];
    
    // 隐藏所有界面
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('game-over-screen').style.display = 'none';
    document.getElementById('game-win-screen').style.display = 'none';
    
    // 更新按钮状态
    document.getElementById('pause-game').innerHTML = '<i class="fas fa-pause"></i><span>暂停游戏</span>';
    document.getElementById('pause-game').style.background = 'linear-gradient(135deg, #ffd32a 0%, #ffa801 100%)';
    
    // 更新游戏信息
    updateGameInfo();
}
// 重置迷宫布局
function resetMaze() {
    maze = [
    [1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,2,1,1,1,1,2,1,1,1,1,1,1,1,1,2,1,1,1,1,2,1,1,2,1],
    [1,2,1,1,2,1,1,1,1,2,1,1,1,1,1,1,1,1,2,1,1,1,1,2,1,1,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,2,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,2,1,1,2,1],
    [1,2,1,1,2,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,2,1,1,2,1],
    [1,2,2,2,2,1,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,1,2,2,2,2,1],
    [1,1,1,1,2,1,1,1,1,2,1,1,0,1,1,0,1,1,2,1,1,1,1,2,1,1,1,1],
    [4,0,0,0,2,1,1,1,1,2,1,1,0,1,1,0,1,1,2,1,1,1,1,2,0,0,0,4],
    [1,1,1,1,2,1,2,2,2,2,1,1,0,0,0,0,1,1,2,2,2,2,1,2,1,1,1,1],
    [1,2,2,2,2,2,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,2,2,2,2,2,1],
    [1,2,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,2,1],
    [1,2,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,2,1],
    [1,2,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,2,1],
    [1,2,2,2,2,2,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,2,2,2,2,2,4],
    [1,1,1,1,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,1,1,1,1],
    [4,0,0,0,2,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,2,0,0,0,4],
    [1,1,1,1,2,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,2,1,1,1,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,2,1,1,1,1,2,1,1,2,1,1,2,1,1,2,1,1,1,1,2,1,1,2,1],
    [1,2,1,1,2,1,1,1,1,2,1,1,2,1,1,2,1,1,2,1,1,1,1,2,1,1,2,1],
    [1,3,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,3,1],
    [1,1,1,1,2,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,2,1,1,1,1],
    [1,1,1,1,2,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,2,1,1,1,1],
    [1,2,2,2,2,1,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,1,2,2,2,2,1],
    [1,2,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];
}
// 切换AI幽灵功能
function toggleAI() {
    gameState.aiEnabled = !gameState.aiEnabled;
    const button = document.getElementById('toggle-ai');
    if (gameState.aiEnabled) {
        button.innerHTML = '<i class="fas fa-brain"></i><span>AI幽灵: 开启</span>';
        button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    } else {
        button.innerHTML = '<i class="fas fa-brain"></i><span>AI幽灵: 关闭</span>';
        button.style.background = 'linear-gradient(135deg, #2d3436 0%, #1e272e 100%)';
    }
}

